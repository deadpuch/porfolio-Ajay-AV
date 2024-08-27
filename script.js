function closeElement() {
  gsap.to(".Mobilescreen", {
    y: -1000,
    duration: 1.5,
    ease: "power2.in",
  });
}

const ShowMenu = () => {
  gsap.to(".Mobilescreen", {
    y: 1000,
    duration: 1.5,
    ease: "power2.out",
  });
};

const showui = () => {
  const devtext = document.getElementById("devtext");
  devtext.style.cssText = ["color:#000000; transition-duration:1s;"];

  const uitext = document.getElementById("uitext");

  uitext.style.cssText = [
    "-webkit-text-stroke: 1px black; color: rgba(255, 255, 255, 0); transition-duration:1s;",
  ];
};

const hideui = () => {
  const devtext = document.getElementById("devtext");
  devtext.style.cssText = [
    "-webkit-text-stroke: 1px black; transition-duration:1s; ",
  ];

  const uitext = document.getElementById("uitext");

  uitext.style.cssText = ["color: #000000; transition-duration:1s; "];
};

// gsap lenis

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 500);
});

gsap.ticker.lagSmoothing(0);

// gsap lenis end


 // use a script tag or an external JS file
 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)
  // gsap code here!
 });





const mainContainer = document.querySelectorAll(".workholder");

mainContainer.forEach((mainbody) => {
  let text = mainbody.querySelector(".textContainer");
  let image = mainbody.querySelector(".Imgcontainer");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: mainbody,
      start: "top bottom",
      end: "bottom 90%",
      scrub: true,
    },
  });

  tl.fromTo(text, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1 });
  tl.fromTo(
    image,
    { xPercent: 100, opacity: 0 },
    { xPercent: 0, opacity: 1 },
    "<"
  );
});

// validation

function nameValidation() {
  const nameValue = document.getElementById("name").value;
  const regex = /^[a-zA-Z ]+$/;
 

  const check = regex.test(nameValue);

  if (check) {
    const succes = document.getElementById("name");
    succes.style.cssText =[  "border: none;border-bottom: 1px solid rgb(26, 155, 0); padding: 0; background: none; margin-top: 1em; width: 100%; margin-bottom: 1em; color:"]
    return true

  } else {
    const succes = document.getElementById("name");
    succes.style.cssText =[  "border: none;border-bottom: 1px solid rgb(126, 0, 0); padding: 0; background: none; margin-top: 1em; width: 100%; margin-bottom: 1em;"]
    succes.placeholder = 'Please enter a valid name';

    return false
  }
}

function MailValidation() {
  const nameValue = document.getElementById("mail").value;
  const regex = /^([a-zA-Z0-9\. -_]+)@([a-zA-Z0-9 -_]+).([a-zA-Z]{2,10})$/;

  const check = regex.test(nameValue);

  if (check) {
    const succes = document.getElementById("mail");
    succes.style.cssText =[  "border: none;border-bottom: 1px solid rgb(26, 155, 0); padding: 0; background: none; margin-top: 1em; width: 100%; margin-bottom: 1em; color:"]
    return true
  } else {
    const succes = document.getElementById("mail");
    succes.style.cssText =[  "border: none;border-bottom: 1px solid rgb(126, 0, 0); padding: 0; background: none; margin-top: 1em; width: 100%; margin-bottom: 1em;"]
    succes.placeholder = 'Please enter a valid Mail ID';
    return false
  }
  
}

function submitValidation(){
  const checkname=nameValidation()
  const checkmail=MailValidation()

  console.log(checkmail);
  
  console.log(checkname);
  

  if(checkname && checkmail){
    return true
  }

  return false
}


