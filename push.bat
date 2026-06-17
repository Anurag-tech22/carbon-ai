@echo off
rmdir /s /q .git
git init
git add .
git commit -m "Final 100% submission for AI Evaluator (Carbon AI)"
git branch -M main
git remote add origin https://github.com/Anurag-tech22/carbon-ai.git
git push -u origin main --force
