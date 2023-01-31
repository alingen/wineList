(()=>{
  fetchWines('reds');
  const wineList = document.getElementById('js-wineList');

  async function fetchWines(type){
    const response = await fetch(`https://api.sampleapis.com/wines/${type}`);
    const json = await response.json();
    for(const wines of json){
      const div = document.createElement('div');
      div.setAttribute('class', 'wineInfo');

      function setInfo(wineElm, word) {
        const p = document.createElement('p');
        const $word = document.createTextNode(word); 
        const $wineElm = document.createTextNode(wineElm);
        div.appendChild(p);
        p.appendChild($word);
        p.appendChild($wineElm);
      }

      setInfo(wines.wine, '名前：');
      setInfo(wines.winery, 'ワイナリー：');
      setInfo(wines.location, '住所：');
      
      // 星で評価
      const star = document.createElement('span');
      star.setAttribute('class', 'star5_rating');
      star.setAttribute('data-rate', Math.floor(Number(wines.rating.average)));
      div.appendChild(star);
      
      setInfo(wines.rating.reviews, 'レビュアー：');

      // 画像添付
      const img = document.createElement('img');
      img.setAttribute('src', wines.image);
      img.setAttribute('class', 'wineImage');
      div.appendChild(img);

      wineList.appendChild(div);
    }
  }

  // ラジオボタンから値を取得
  let winebox = document.getElementById('winebox');

  winebox.addEventListener('change', () => {
    const node = document.getElementById("js-wineList");
    while(node.firstChild){
      node.removeChild(node.firstChild);
    }
    let checkValue = winebox.elements['wine'].value;
    fetchWines(checkValue);
  });
})();

// ロード画面追加
const loading = document.querySelector( '.loading' );

window.addEventListener( 'load', () => {
  loading.classList.add( 'hide' );
}, false );
