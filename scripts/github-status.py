"""Read GitHub state using the existing Git credential manager; never log secrets."""
import json, os, subprocess, urllib.request, shutil
from pathlib import Path
env=dict(os.environ,GIT_TERMINAL_PROMPT='0',GCM_INTERACTIVE='never')
git_bin=Path(shutil.which('git')).resolve().parent.parent/'mingw64/bin'
if (git_bin/'git-remote-https.exe').exists(): env['GIT_EXEC_PATH']=str(git_bin)
result=subprocess.run(['git','credential','fill'],input='protocol=https\nhost=github.com\n\n',text=True,capture_output=True,env=env)
if result.returncode: print('No noninteractive GitHub credential available.'); raise SystemExit(2)
cred=dict(line.split('=',1) for line in result.stdout.splitlines() if '=' in line)
token=cred.get('password','')
for route in ('user','repos/SideQuest86/StellarisTales','repos/SideQuest86/StellarisTales/pages'):
    req=urllib.request.Request('https://api.github.com/'+route,headers={'Authorization':'Bearer '+token,'Accept':'application/vnd.github+json','User-Agent':'StellarisTales-builder'})
    try:
        with urllib.request.urlopen(req) as response:
            data=json.load(response);print(route,json.dumps({k:data.get(k) for k in ('login','id','name','full_name','private','default_branch','html_url','status','build_type','source') if k in data}))
    except urllib.error.HTTPError as e: print(route,'HTTP',e.code)
