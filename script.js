const rssUrl = "https://feeds.nos.nl/nosnieuwsalgemeen";
const apiUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(rssUrl);

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById("nieuws");

    if (!data.items || data.items.length === 0) {
      container.innerHTML = "<p>Geen nieuws gevonden.</p>";
      return;
    }

    let html = "";

    data.items.slice(0,15).forEach(item => {

      let image = "";

      if(item.thumbnail){
        image = item.thumbnail;
      }else{
        const match = item.description.match(/<img.*?src="(.*?)"/i);
        if(match){
          image = match[1];
        }
      }

      html += `
      <article>

        ${image ? `<img src="${image}" alt="">` : ""}

        <div class="tekst">

          <h2>
            <a href="${item.link}" target="_blank">
              ${item.title}
            </a>
          </h2>

          <small>${new Date(item.pubDate).toLocaleString("nl-NL")}</small>

          <p>${
item.description
.replace(/<img[^>]*>/gi,"")
.replace(/<[^>]+>/g,"")
.substring(0,220)
}...</p>

        </div>

      </article>
      `;

    });

    container.innerHTML = html;

  })

  .catch(error=>{

      document.getElementById("nieuws").innerHTML = ...

      console.error(error);

  });
