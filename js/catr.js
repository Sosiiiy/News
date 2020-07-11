

var Postrow=document.getElementById("Postsrow");
var link=document.getElementsByClassName("catego");


var category="business";

var count="us";

var posts="";

var req = new XMLHttpRequest();

var po="";


$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
  
  var url = 'http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6274bc8dd4e14c89afdec25c6ec4a1b3';
  
  getposts(url);
  
});

	$('.owl-carousel').owlCarousel({
		  center: true,
		loop:true,
	    margin:10,
	    nav:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:5
	        }
	    }
	})
	
country();
cat();	

function country(){
			$('.country').on('change', function(){
		        count = $(this).val();
		  var url = 'https://newsapi.org/v2/top-headlines?country='+count+'&category='+category+'&apiKey=6274bc8dd4e14c89afdec25c6ec4a1b3';		        
			getposts(url);
		
		
			});
	
}

	function cat(){
		for(var i=0;i<link.length;i++){
			
			link[i].addEventListener("click",function(e){
				
			category=e.target.innerHTML;
			var url = 'https://newsapi.org/v2/top-headlines?country='+count+'&category='+category+'&apiKey=6274bc8dd4e14c89afdec25c6ec4a1b3';
			getposts(url);
			console.log(category);
			
			})

		}
	}
	
	
	$('#button-addon2').on('click', function(e){
	    var keyword = $('.keywords').val();
	    if(keyword.length < 3){
	     alert('Enter valid keyword to search, minimum 3 character');
	     return false;
	    }
	    
	var url = 'https://newsapi.org/v2/top-headlines?q='+keyword+'&country='+count+'&category='+category+'&apiKey=6274bc8dd4e14c89afdec25c6ec4a1b3';
	getposts(url);	
	});	
	
	function getposts(url){
		
		req.open("GET",url,false);
		
		req.onreadystatechange = function(){
			
			if(req.readyState == 4 && req.status == 200){
				posts=JSON.parse(req.response);
				po=posts.articles;
				console.log(po);
			
				displayposts();
				
			}
			else{
				console.log("connection error");
				}
			
		}
		
		req.send();
		
		
	}


	displayposts();
	AOS.init();

	function displayposts(){
		
		var temps="";
		
		for(var i=0;i<po.length;i++){
			
			temps+=`<div class=" col-md-6 col-lg-4 news" data-aos="zoom-in"  data-aos-duration="0">
			<div class="thumb position-relative"><a href="`+po[i].url+`">
			<img class="img-fluid" onerror='this.src="../imgs/web-1045994__340.jpg"' src="`+po[i].urlToImage+`"/></a></div>
			<div class="details d-flex">
			<div class="short-details">
			<a class="date"  href=#>`+po[i].author+`</a>
	/
	<a class="date"  href=#>`+po[i].publishedAt+`</a>
	<h6>`+po[i].title+`</h6>
	<a class="social" href=#><i class="far fa-comment-alt px-1"></i>05 comment</a>
	<a class="social" href=#><i class="far fa-heart px-1"></i>0 like</a>
	<a class="social" href=#>10<i class="far fa-eye px-1"></i></a>
	</div>
	</div>
	</div>
			</div>`
		

		
		}
		
		
		Postrow.innerHTML= temps;
		


	}	
	
	
	
	
	
	
	
	
	
	