const rssUrl = "https://feeds.nos.nl/nosnieuwsalgemeen";

const apiUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(rssUrl);

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("news");

    if (!data.items || data.items.length === 0) {
      container.innerHTML = "<p>Geen nieuws gevonden.</p>";
      return;
    }

    let html = "";

    data.items.slice(0, 15).forEach(item => {
      html += `
        <div class="news-item">
          <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
          <small>${new Date(item.pubDate).toLocaleString("nl-NL")}</small>
          <p>${item.description}</p>
          <hr>
        </div>
      `;
    });

    container.innerHTML = html;
  })
  .catch(error => {
    document.getElementById("news").innerHTML =
      "<p>Kon het nieuws niet laden.</p>";
    console.error(error);
  });
