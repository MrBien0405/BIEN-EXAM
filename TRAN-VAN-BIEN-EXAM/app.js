function getData(url, fn) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        fn(undefined, JSON.parse(xhr.responseText));
      } else {
        fn(new Error(xhr.statusText), undefined);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
// 1.1
let searchInput = document.getElementById("input");
let child = document.getElementById("child");

searchInput.addEventListener("keyup", () => {
  getData(
    `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${searchInput.value}`,
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        child.innerHTML = "";
        for (let i = 0; i <= res[1].length - 1; i++) {
          console.log(res[1][i]);
          getData(
            `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageprops|pageimages&format=json&titles=${res[1][i]}`,
            (errImg, resImg) => {
              if (err) {
                console.log(errImg);
              } else {
                let a = Object.keys(resImg.query.pages)[0];
                let linkAnh = resImg.query.pages[a].thumbnail.source;
                let linkMieuTa =
                  resImg.query.pages[a].pageprops["wikibase-shortdesc"];
                child.innerHTML += ` <div class="wrapper-parrent" id="wrapperParrent">
      <div class="child-img">
          <img src="${linkAnh}" alt="photo">
      </div>
      <div class="child-title">
          <h3>${res[1][i]}</h3>
          <p>${linkMieuTa}</p>
      </div>`;
              }
            }
          );
        }
      }
    }
  );
});

// child.innerHTML += ` <div class="wrapper-parrent" id="wrapperParrent">
//       <div class="child-img">
//           <img src="lion.jpeg" alt="photo">
//       </div>
//       <div class="child-title">
//           <h3>${res[1][i]}</h3>
//           <p>large cat native to Africa and Asia</p>
//       </div>`;
