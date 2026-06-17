import os
import shutil

base_dir = r"C:\Users\jagta\carbon Ai"
frontend_dir = os.path.join(base_dir, "frontend")
backend_dir = os.path.join(base_dir, "backend")
api_dir = os.path.join(base_dir, "api")

# 1. Rename backend to api
if os.path.exists(backend_dir):
    os.rename(backend_dir, api_dir)

# 2. Rename main.py to index.py
main_py = os.path.join(api_dir, "main.py")
index_py = os.path.join(api_dir, "index.py")
if os.path.exists(main_py):
    os.rename(main_py, index_py)

# 3. Move all contents of frontend to base_dir
if os.path.exists(frontend_dir):
    for item in os.listdir(frontend_dir):
        # Don't overwrite the script itself or api dir if they somehow conflict
        if item in ['api', 'restructure.py']:
            continue
            
        src = os.path.join(frontend_dir, item)
        dst = os.path.join(base_dir, item)
        
        # Remove destination if it already exists to avoid errors
        if os.path.exists(dst):
            if os.path.isdir(dst):
                shutil.rmtree(dst)
            else:
                os.remove(dst)
                
        shutil.move(src, dst)
    
    # Remove empty frontend dir
    try:
        os.rmdir(frontend_dir)
    except Exception as e:
        print(f"Could not remove frontend dir: {e}")

print("Restructuring complete!")
