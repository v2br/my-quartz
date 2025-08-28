import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { useEffect } from "preact/hooks";
useEffect(() => {
  const tryRenderMarkmap = () => {
    const blocks = document.querySelectorAll("pre code.language-markmap")
    blocks.forEach((block) => {
      const content = block.textContent || ""
      const container = document.createElement("div")
      container.classList.add("markmap")
      const script = document.createElement("script")
      script.type = "text/template"
      script.textContent = content
      container.appendChild(script)
      block.parentElement?.replaceWith(container)
    })

    if (window.markmap?.autoLoader?.renderAll) {
      window.markmap.autoLoader.renderAll()
    } else {
      // Wait and retry if Markmap is not ready yet
      setTimeout(tryRenderMarkmap, 200)
    }
  }

  tryRenderMarkmap()
}, [])

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return <article class={classString}>{content}</article>
}

export default (() => Content) satisfies QuartzComponentConstructor
