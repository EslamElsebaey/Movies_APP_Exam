
$(document).ready(function(){
  //  loading spinner


$("#loading .loader").fadeOut(3000, function () {
  $("#loading").fadeOut(1300, function () {
    $("body").css("overflow", "visible");
    $("#loading").remove();
  });
});
 

  // *********************************************************************************************************

  //  wow.js
  new WOW().init();

  // *********************************************************************************************************

  // sideBar
$(document).on("click", ".exe", function () {
  if ($(".sidebar").hasClass("slide") == true) {
    $(".sidebar").removeClass("slide");
    $(".mainLi").show(1000);
    $(".exe").removeClass("fa-solid fa-bars");
    $(".exe").addClass("fa-solid fa-xmark");
  } else {
    $(".sidebar").addClass("slide");
    $(".mainLi").css("display", "none");
    $(".exe").removeClass("fa-solid fa-xmark");
    $(".exe").addClass("fa-solid fa-bars");
  }
});

  // *********************************************************************************************************

  //  get all movies categories except trending

  let moviesResult;

  $(".link").click(function (e) {
    getMovies(e.target.id);
  });

  async function getMovies(term) {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${term}?api_key=56f77d211d0e245479bc8ca9bc057fea&language=en-US&page=1`
    );
    moviesResult = (await response.json()).results;
    showMovies();
  }

  function showMovies() {
    let myDivs = "";
    for (let i = 0; i < moviesResult.length; i++) {
      myDivs += `
       <div class="col-lg-4 col-md-6  wow  bounceInLeft  "  data-wow-duration="2s">
          <div class="item text-center">
            <img class="w-100" src="https://image.tmdb.org/t/p/w500${moviesResult[i].poster_path}" alt="">
            <div class="overlay">
            <h3 class="mb-4">${moviesResult[i].original_title}</h3>
            <p class="mb-4 fw-bolder">${moviesResult[i].overview}</p>
            <span class="fw-bolder d-block mb-3">Rate: ${moviesResult[i].vote_average}</span>
            <h6 class="fw-bolder">${moviesResult[i].release_date}</h6>
            </div>
          </div>
        </div>
    `;
    }

    $("#myRow").html(myDivs);
  }

  getMovies("popular");

  // *********************************************************************************************************

  // get trending movies becuse there is a big difference in the URL

  let finalResult;

  $("#trendy").click(function () {
    getTrending();
  });

  async function getTrending() {
    let myResponse = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=56f77d211d0e245479bc8ca9bc057fea`
    );
    finalResult = (await myResponse.json()).results;
    displayMovies();
  }

  function displayMovies() {
    let divs = "";
    for (let i = 0; i < finalResult.length; i++) {
      if (finalResult[i].original_title == undefined) {
        finalResult[i].original_title = finalResult[i].original_name;
      } else if (finalResult[i].original_name == undefined) {
        finalResult[i].original_title = finalResult[i].title;
      }
      divs += `
       <div class="col-lg-4 col-md-6 wow  bounceInLeft" data-wow-duration="2s">
          <div class="item text-center  wow  bounceInLeft  "  data-wow-duration="2s" >
            <img class="w-100" src="https://image.tmdb.org/t/p/w500${finalResult[i].poster_path}" alt="">
            <div class="overlay">
            <h3 class="mb-4">${finalResult[i].original_title}</h3>
            <p class="mb-4 fw-bolder">${finalResult[i].overview}</p>
            <span class="fw-bolder d-block mb-3">Rate: ${finalResult[i].vote_average}</span>
            <h6 class="fw-bolder">${finalResult[i].release_date}</h6>
            </div>
          </div>
        </div>
    `;
    }

    $("#myRow").html(divs);
  }

  //******************************************************************************************************************
  // search for any movie you want by word

  let finalReq;

  async function searchMovies(searchTerm) {
    let req = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=56f77d211d0e245479bc8ca9bc057fea&query=${searchTerm}`
    );
    finalReq = (await req.json()).results;
    displaySearched();
    if ($("#wordSearch").val() == "") {
      showMovies();
    }
  }

  $("#wordSearch").keyup(function () {
    searchMovies($("#wordSearch").val());
  });

  function displaySearched() {
    let searchMovies = "";
    for (let i = 0; i < finalReq.length; i++) {
      searchMovies += `<div class="col-md-4" class="wow slideInLeft" data-wow-duration="2s" >
          <div class="item text-center">
            <img class="w-100" src="https://image.tmdb.org/t/p/w500${finalReq[i].poster_path}" alt="">
            <div class="overlay">
            <h3 class="mb-4">${finalReq[i].original_title}</h3>
            <p class="mb-4 fw-bolder">${finalReq[i].overview}</p>
            <span class="fw-bolder d-block mb-3">Rate: ${finalReq[i].vote_average}</span>
            <h6 class="fw-bolder">${finalReq[i].release_date}</h6>
            </div>
          </div>
        </div>`;
    }
    $("#myRow").html(searchMovies);
    if ($("#myRow").html() == "") {
      $("#myRow").html(
        "<h1 class='text-danger text-center'>There are no matched movies</h1>"
      );
      $("#myRow").css({
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });
    }
  }

  //******************************************************************************************************************

  // search among existed movies at your sight

  $("#randowSearch").keyup(function () {
    let randomSearched = "";
    for (let i = 0; i < moviesResult.length; i++) {
      if (
        moviesResult[i].original_title
          .toLowerCase()
          .includes($("#randowSearch").val())
      ) {
        randomSearched += `
       <div class="col-md-4">
          <div class="item text-center">
            <img class="w-100" src="https://image.tmdb.org/t/p/w500${moviesResult[i].poster_path}" alt="">
            <div class="overlay">
            <h3 class="mb-4">${moviesResult[i].original_title}</h3>
            <p class="mb-4 fw-bolder">${moviesResult[i].overview}</p>
            <span class="fw-bolder d-block mb-3">Rate: ${moviesResult[i].vote_average}</span>
            <h6 class="fw-bolder">${moviesResult[i].release_date}</h6>
            </div>
          </div>
        </div>
    `;
      }
    }
    $("#myRow").html(randomSearched);
    if ($("#myRow").html() == "") {
      console.log("hi")
      $("#myRow").html(
        "<h1 class='text-danger text-center'>There are no matched movies</h1>"
      );
      $("#myRow").css({
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });
    }else{
      $("#myRow").css({
        height: "auto",
      })
    
     }
    
  });

  // *****************************************************************************************************************

  // Inputs validation

  // userName validation
  $("#userName").keyup(function () {
    let regex = /^[A-Z]{1}[a-z]{2,8} [A-Z]{1}[a-z]{2,8}$/gm;
    if (regex.test($("#userName").val())) {
      $(".namewarn").addClass("d-none");
      $("#submit").removeAttr("disabled");
    } else {
      $(".namewarn").removeClass("d-none");
      $("#submit").attr("disabled", "disabled");
    }

    if ($("#userName").val() == "") {
      $(".namewarn").addClass("d-none");
    }
  });

  // userPhone validation
  $("#userPhone").keyup(function () {
    let phoneRegex = /^01[0125][0-9]{8}$/gm;
    if (phoneRegex.test($("#userPhone").val())) {
      $(".phonewarn").addClass("d-none");
      $("#submit").removeAttr("disabled");
    } else {
      $(".phonewarn").removeClass("d-none");
      $("#submit").attr("disabled", "disabled");
    }

    if ($("#userPhone").val() == "") {
      $(".phonewarn").addClass("d-none");
    }
  });

  // userPassword validation
  $("#userPassword").keyup(function () {
    let phoneRegex = /^[A-Za-z]{1}[0-9]{5,15}$/gm;
    if (phoneRegex.test($("#userPassword").val())) {
      $(".passwarn").addClass("d-none");
      $("#submit").removeAttr("disabled");
    } else {
      $(".passwarn").removeClass("d-none");
      $("#submit").attr("disabled", "disabled");
    }
    if ($("#userPassword").val() == "") {
      $(".passwarn").addClass("d-none");
    }
  });

  // userEmail validation
  $("#userEmail").keyup(function () {
    let phoneRegex = /^[a-z]{2,15}[0-9]{0,4}?\@[a-z]{3,6}.[a-z]{2,4}$/gm;
    if (phoneRegex.test($("#userEmail").val())) {
      $(".emailwarn").addClass("d-none");
      $("#submit").removeAttr("disabled");
    } else {
      $(".emailwarn").removeClass("d-none");
      $("#submit").attr("disabled", "disabled");
    }
    if ($("#userEmail").val() == "") {
      $(".emailwarn").addClass("d-none");
    }
  });

  // userAge validation
  $("#userAge").keyup(function () {
    let phoneRegex = /^([1-6]{1}[0-9]{1}|(70))$/gm;
    if (phoneRegex.test($("#userAge").val())) {
      $(".agewarn").addClass("d-none");
      $("#submit").removeAttr("disabled");
    } else {
      $(".agewarn").removeClass("d-none");
      $("#submit").attr("disabled", "disabled");
    }
    if ($("#userAge").val() == "") {
      $(".agewarn").addClass("d-none");
    }
  });

  // userConfirm validation

  $("#userConfirm").keyup(function () {
    if ($("#userConfirm ").val() === $("#userPassword").val()) {
      $(".confirmwarn").addClass("d-none");
      $("#submit").removeAttr("disabled");
    } else {
      $(".confirmwarn").removeClass("d-none");
      $("#submit").attr("disabled", "disabled");
    }
    if ($("#userConfirm").val() == "") {
      $(".confirmwarn").addClass("d-none");
    }
  });

  // Clear Inputs

  $("#clear").click(function (e) {
      $(".mywarn").addClass("d-none");
  });
  $("form").submit(function(e){
    e.preventDefault() ;
  })

  // got to contact section

  $(".contactus").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#contactSection").offset().top,
      },
      2000
    );
  });

  // show  and activate to top icon

  $(window).scroll(function () {
    if ($(window).scrollTop() > 600) {
      $(".totop").show(1000);
      $(".totop").addClass("d-flex");
    } else {
      $(".totop").hide(1000, function () {
        $(".totop").removeClass("d-flex");
      });
    }
  });

  $(".totop").click(function () {
    $("html").animate(
      {
        scrollTop: 0,
      },
      800
    );
  });

  // change the icon of opening the navbar in small screen

  $(".burger").click(function () {
    if ($(".burger").hasClass("fa-solid fa-xmark") == true) {
      $(".burger").removeClass("fa-solid fa-xmark");
      $(".burger").addClass("fa-solid fa-bars");
    } else {
      $(".burger").removeClass("fa-solid fa-bars");
      $(".burger").addClass("fa-solid fa-xmark");
    }
  });
})






