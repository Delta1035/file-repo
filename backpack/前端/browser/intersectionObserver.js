var intersectionObsrever = new IntersectionObserver(function(entries){
    console.log(entries);
});

intersectionObsrever.observe(document.querySelector('.target'));

