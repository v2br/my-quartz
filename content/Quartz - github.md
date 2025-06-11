##  **Step-by-Step Setup**

# Step 0
```
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create

```
(you can just click enter don't change anything )


2. copy files "to share" to the "content" folder
to do this i have a script 
# Step 1
```
#!/bin/bash

# Usage: ./copy_share_true_tree.sh <source_dir> <destination_dir>

set -e


SOURCE_DIR="/Users/vbr/Documents/ObsidianWIKI/VBV"
DEST_DIR="/Users/vbr/Projects/quartz/content"

SEARCH_CRITERIA='share: "true"'

echo "🔍 Source directory     : $SOURCE_DIR"
echo "📁 Destination directory: $DEST_DIR"
echo "🔎 Search criteria      : $SEARCH_CRITERIA"
echo ""

count=0

while IFS= read -r filepath; do
  rel_path="${filepath#$SOURCE_DIR/}"
  dest_path="$DEST_DIR/$rel_path"
  dest_dir_path="$(dirname "$dest_path")"

  echo "✅ Found: $rel_path"

  if [ ! -d "$dest_dir_path" ]; then
    echo "📂 Creating directory: $dest_dir_path"
    if mkdir -p "$dest_dir_path"; then
      echo "✅ Directory created successfully"
    else
      echo "❌ Failed to create directory: $dest_dir_path"
      continue
    fi
  fi

  if cp "$filepath" "$dest_path"; then
    echo "📁 Copied to: $dest_path"
    ((count++))
  else
    echo "❌ Failed to copy: $filepath"
  fi

  echo ""
done < <(grep -rFl "$SEARCH_CRITERIA" "$SOURCE_DIR" --exclude-dir=".git")

echo "📦 Total files copied: $count"
echo "✅ Done."
```

Change your source and destination dir and run it. 
this will create a copy of pages in the "content" folder
after that run 

# Step 3.1:  change  **quartz.config.ts**
in the file **quartz.config.ts**
change baseUrl: "https://github.com/YOURNAME/my-quartz",
page title " My digital Garden"
close file 

# Step 3.2
```
cd quartz/.github/workflows
touch deploy.yaml

```

write into this file 
```
name: Deploy Quartz v4.5.1+ to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js 22
        uses: actions/setup-node@v3
        with:
          node-version: 22
          cache: 'npm'

      - name: Confirm Node and NPM versions
        run: |
          node -v
          npm -v

      - name: Install dependencies
        run: npm install

      - name: Build Quartz site with Quartz CLI
        run: npx quartz build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```


# Step 4 
```
cd ~/Projects/quartz
git init
git remote remove origin
git remote remove upstream
git branch -M main

git remote set-url origin  https://github.com/YOURNAME_HERE/"my-quartz".git

```

```
git add . 
git commit -m "Initial Quartz commit"
git branch -M main
git remote add origin https://github.com/YOURNAME_HERE/my-quartz.git
git push -u origin main
```


# Step 5
on the github go to 
- What you see under **Settings → Pages**
-  → ## Build and deployment -source 
	- Deploy from branch → gh pages
	- folder root 
wait and you should see the site deployed. 
