"""Copy the supplied official soundtrack album, keeping original MP3 bytes."""
import argparse,hashlib,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'.tools/pythonlibs'))
from mutagen.mp3 import MP3
from PIL import Image
ap=argparse.ArgumentParser();ap.add_argument('--game',type=Path,required=True);args=ap.parse_args()
source=args.game/'soundtrack/mp3';dest=ROOT/'public/music';dest.mkdir(parents=True,exist_ok=True)
tracks=[]
for p in sorted(source.glob('*.mp3')):
    tags=MP3(p);digest=hashlib.sha256(p.read_bytes()).hexdigest();out=dest/p.name
    if not out.exists() or hashlib.sha256(out.read_bytes()).hexdigest()!=digest:out.write_bytes(p.read_bytes())
    def tag(k,default):return str(tags.tags.get(k,default))
    tracks.append({'id':p.stem,'title':tag('TIT2',p.stem),'artist':tag('TPE1',''),'album':tag('TALB','Stellaris Original Soundtrack'),'duration':round(tags.info.length,2),'url':'music/'+p.name,'source':p.relative_to(args.game).as_posix(),'sha256':digest,'bytes':p.stat().st_size})
cover=source/'Stellaris Digital OST.png';im=Image.open(cover);im.thumbnail((600,600));im.convert('RGB').save(dest/'cover.webp','WEBP',quality=90)
(dest/'playlist.json').write_text(json.dumps({'title':'Stellaris Original Soundtrack','cover':'music/cover.webp','loop':'playlist','tracks':tracks},ensure_ascii=False,separators=(',',':')),encoding='utf8')
print(json.dumps({'tracks':len(tracks),'minutes':round(sum(t['duration'] for t in tracks)/60),'sizeMB':round(sum(t['bytes'] for t in tracks)/1e6),'first':tracks[0]['title']},ensure_ascii=False))
