const reddenPage = async () => {
  //serching for the stackoverflow links
  var allLinks = document.querySelectorAll(
    'a[href*="https://stackoverflow.com/questions/"'
  );
  if (allLinks) {
    allLinks.forEach(async (p) => {
      //Now we fetch all pages found on the main google page, and search if there is verified answer or not.

      /* ---------- Fetch method ---------- */
      fetch(`https://nsnikunj353gmailcom-nsniku-704.herokuapp.com/${p.href}`, {
        method: "GET",
        Accept: "*/*",
        "Accept-Encoding ": "gzip, deflate, br",
        "Accept-Language": "en-GB,en;q=0.6",
        Connection: "keep-alive",
        Host: "cors-anywhere.herokuapp.com",
        Origin: null,
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "Sec-GPC": 1,
        "User-Agent": window.navigator.userAgent,
      })
        .then(function (res) {
          //convert the response into text.
          return res.text();
        })
        .then(function (html) {
          if (
            html.includes(
              'class="js-accepted-answer-indicator flex--item fc-green-500 py6 mtn8"' //this is class of verified tick mark.
              /* this is class is already present in the all answers but the disply set to none therefor we can't see the tick mark on unverified answers.
                The class 'd-none' is present on unverified answers. */
            )
          ) {
            // p.style.color = "#75ff75"; //if found verified answer then turn link to green.

            //add verify icon in the side of the link
            var img = document.createElement("img");
            img.src = chrome.runtime.getURL("check.png")
            img.style.width = '18px'
            img.style.marginLeft = '7px'
            p.appendChild(img);
          }
        });
    });
  }
};



reddenPage();
