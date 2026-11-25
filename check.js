const fs=require('fs');const h=fs.readFileSync(process.argv[2],'utf8');
const js=h.split('<script>')[1].split('</script>')[0];
global.localStorage={getItem:()=>null,setItem(){}};
global.document={getElementById:()=>({addEventListener(){},innerHTML:'',value:''}),addEventListener(){}};
global.window={scrollTo(){}};global.requestAnimationFrame=()=>{};global.setTimeout=()=>{};
eval(js+';var tot=0;var o=[];S.sections.forEach(function(s){tot+=s.words.length;if(s.words.length)o.push([s.name,s.words.length,s.words[0].no,s.words[s.words.length-1].no,s.words.filter(x=>x.ex&&x.exja).length,s.words.reduce((a,x)=>a+(x.der||[]).length,0)].join(" "))});o.push("TOTAL "+tot);require("fs").writeFileSync("out.txt",o.join("\\n"))');
