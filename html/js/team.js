
 // code to hide the icons and close button

 document.getElementById('teamHid').style.display = 'none';
 document.getElementById('teamHid7').style.display = 'none';
 document.getElementById('teamHid8').style.display = "none";
 document.getElementById('teamHid9').style.display = "none";
 document.getElementById('teamHid10').style.display = "none";
 document.getElementById('teamHid11').style.direction = "none";
 //document.getElementById('teamHid12').style.direction = "none";
 //document.getElementById('teamHid10').style.display = "none";
 $("#icons-team2-close").css("display", "none");
 $("#icons-team3-close").css("display", "none");
 $("#icons-team4-close").css("display", "none");
 $("#icons-team5-close").css("display", "none");
 $("#icons-team6-close").css("display", "none");
 $("#icons-team7-close").css("display", "none");
 $("#icons-team8-close").css("display", "none");
 $("#icons-team9-close").css("display", "none");
 $("#icons-team10-close").css("display", "none");
 $("#icons-team11-close").css("display", "none");
// $("#icons-team12-close").css("display", "none");
  document.getElementById('icons-team').style.display = 'none';
   document.getElementById('icons-team-close').style.display = 'none';
    document.getElementById('icons-team2').style.display = 'none';
   document.getElementById('icons-team2-close').style.display = 'none';
    document.getElementById('icons-team3').style.display = 'none';
   document.getElementById('icons-team3-close').style.display = 'none';
 
   
 
  function showTeamMember(imgs,desc,empName,empDesignation) {
     document.getElementById('teamHid').style.display = 'block';
     document.getElementById('icons-team').style.display = 'none';
    document.getElementById('icons-team-close').style.display = 'none';
      var expandImg = document.getElementById("expandedImg");
      expandImg.src = imgs.src;
      document.getElementById("demo").innerHTML = desc;
      document.getElementById("name").innerHTML = empName;
   //    document.getElementById("designation").innerHTML = empDesignation;
      expandImg.parentElement.style.display = "block";
      document.getElementById('icons-team').style.display = 'block';
       document.getElementById('icons-team-close').style.display = 'block';
      expandedImg2.parentElement.style.display = "none";
      expandedImg3.parentElement.style.display = "none";
      expandedImg8.parentElement.style.display = "none"; 
      expandedImg9.parentElement.style.display = "none";
      //expandedImg10.parentElement.style.display = "none";
      expandedImg10.parentElement.style.display = "none";
      expandedImg11.parentElement.style.display = "none";
      expandedImg12.parentElement.style.display = "none";
    }

 function teamMemberPics10(imgs,desc,desc2,empName,empDesignation) {
    // document.getElementById('teamHid').style.display = 'none';
     document.getElementById('icons-team10').style.display = 'none';
    document.getElementById('icons-team10-close').style.display = 'none';
     var expandImg10 = document.getElementById("expandedImg10");
     expandImg10.src = imgs.src;
     document.getElementById("demo10").innerHTML = desc;
     document.getElementById("demoNew10").innerHTML = desc2;
     document.getElementById("name10").innerHTML = empName;
  //    document.getElementById("designation8").innerHTML = empDesignation;
     expandImg10.parentElement.style.display = "block";
      document.getElementById('icons-team10').style.display = 'block';
      document.getElementById('icons-team10-close').style.display = 'block';
       expandedImg7.parentElement.style.display = "none";
       expandedImg6.parentElement.style.display = "none";
       expandedImg5.parentElement.style.display = "none";
      //expandedImg.parentElement.style.display = "none";
      expandedImg2.parentElement.style.display = "none";
       expandedImg4.parentElement.style.display = "none";
       expandedImg3.parentElement.style.display = "none";
       expandedImg8.parentElement.style.display = "none";
       expandedImg9.parentElement.style.display = "none";
       expandedImg11.parentElement.style.display = "none";
       expandedImg12.parentElement.style.display = "none";
   }
   
    function teamMembers(imgs,desc,desc2,empName,empDesignation) {
     document.getElementById('teamHid').style.display = 'block';
    document.getElementById('icons-team2').style.display = 'none';
    document.getElementById('icons-team2-close').style.display = 'none';
     var expandedImg2 = document.getElementById("expandedImg2");
       expandedImg2.src = imgs.src;
      document.getElementById("demo2").innerHTML = desc;
      document.getElementById("demoNew").innerHTML = desc2;
      document.getElementById("name2").innerHTML = empName;
   //document.getElementById("designation2").innerHTML = empDesignation;
    
      expandedImg2.parentElement.style.display = "block";
       document.getElementById('icons-team2').style.display = 'block';
       document.getElementById('icons-team2-close').style.display = 'block';
      //expandImg.parentElement.style.display = "none";
      expandedImg3.parentElement.style.display = "none";
      expandedImg4.parentElement.style.display = "none";
      expandedImg5.parentElement.style.display = "none";
      expandedImg6.parentElement.style.display = "none";
      expandedImg7.parentElement.style.display = "none";
      expandedImg8.parentElement.style.display = "none"; 
      expandedImg9.parentElement.style.display = "none";
      //expandedImg10.parentElement.style.display = "none";
      expandedImg10.parentElement.style.display = "none";
      expandedImg11.parentElement.style.display = "none";
      expandedImg12.parentElement.style.display = "none";
    }
   
    function teamMemberPics(imgs,desc,desc2,empName,empDesignation) {
 
     document.getElementById('teamHid').style.display = 'block';
    document.getElementById('icons-team3').style.display = 'none';
    document.getElementById('icons-team3-close').style.display = 'none';
      var expandImg3 = document.getElementById("expandedImg3");
      expandImg3.src = imgs.src;
      document.getElementById("demo3").innerHTML = desc;
      document.getElementById("demoNew3").innerHTML = desc2;
      document.getElementById("name3").innerHTML = empName;
   //    document.getElementById("designation3").innerHTML = empDesignation;
      expandImg3.parentElement.style.display = "block";
       document.getElementById('icons-team3').style.display = 'block';
       document.getElementById('icons-team3-close').style.display = 'block';
    //  expandedImg.parentElement.style.display = "none";
      expandedImg2.parentElement.style.display = "none";
      expandedImg4.parentElement.style.display = "none";
      expandedImg5.parentElement.style.display = "none";
      expandedImg6.parentElement.style.display = "none";
      expandedImg7.parentElement.style.display = "none";
      expandedImg8.parentElement.style.display = "none"; 
      expandedImg9.parentElement.style.display = "none";
      //expandedImg10.parentElement.style.display = "none";
      expandedImg10.parentElement.style.display = "none";
      expandedImg11.parentElement.style.display = "none";
      expandedImg12.parentElement.style.display = "none";
    }
function teamMemberPics33(imgs,desc,desc33,empName33,empDesignation33) {
     document.getElementById('teamHid').style.display = 'block';
    document.getElementById('icons-team33').style.display = 'none';
    document.getElementById('icons-team33-close').style.display = 'none';
      var expandImg3 = document.getElementById("expandedImg33");
      expandImg3.src = imgs.src;
      document.getElementById("demo33").innerHTML = desc;
      document.getElementById("demoNew33").innerHTML = desc33;
      document.getElementById("name33").innerHTML = empName33;
   //    document.getElementById("designation3").innerHTML = empDesignation;
      expandImg3.parentElement.style.display = "block";
       document.getElementById('icons-team33').style.display = 'block';
       document.getElementById('icons-team33-close').style.display = 'block';
    //  expandedImg.parentElement.style.display = "none";
      expandedImg2.parentElement.style.display = "none";
      expandedImg4.parentElement.style.display = "none";
      expandedImg5.parentElement.style.display = "none";
      expandedImg6.parentElement.style.display = "none";
      expandedImg7.parentElement.style.display = "none";
      expandedImg8.parentElement.style.display = "none"; 
      expandedImg9.parentElement.style.display = "none";
      //expandedImg10.parentElement.style.display = "none";
      expandedImg10.parentElement.style.display = "none";
      expandedImg11.parentElement.style.display = "none";
      expandedImg12.parentElement.style.display = "none";
    }
    function teamMemberPics4(imgs,desc,desc2,empName,empDesignation) {
     document.getElementById('teamHid').style.display = 'block';
    document.getElementById('icons-team4').style.display = 'none';
    document.getElementById('icons-team4-close').style.display = 'none';
      var expandImg4 = document.getElementById("expandedImg4");
      expandImg4.src = imgs.src;
      document.getElementById("demo4").innerHTML = desc;
      document.getElementById("demoNew4").innerHTML = desc2;
      document.getElementById("name4").innerHTML = empName;
   //    document.getElementById("designation4").innerHTML = empDesignation;
      expandImg4.parentElement.style.display = "block";
       document.getElementById('icons-team4').style.display = 'block';
       document.getElementById('icons-team4-close').style.display = 'block';
     //  expandedImg.parentElement.style.display = "none";
      expandedImg3.parentElement.style.display = "none";
      expandedImg2.parentElement.style.display = "none";
      expandedImg5.parentElement.style.display = "none";
      expandedImg6.parentElement.style.display = "none";
      expandedImg7.parentElement.style.display = "none";
      expandedImg8.parentElement.style.display = "none"; 
      expandedImg9.parentElement.style.display = "none";
      //expandedImg10.parentElement.style.display = "none";
      expandedImg10.parentElement.style.display = "none";
      expandedImg11.parentElement.style.display = "none";
      expandedImg12.parentElement.style.display = "none";
    }
    function teamMemberPics5(imgs,desc,desc2,empName,empDesignation) {
     document.getElementById('teamHid').style.display = 'block';
    document.getElementById('icons-team5').style.display = 'none';
    document.getElementById('icons-team5-close').style.display = 'none';
      var expandImg5 = document.getElementById("expandedImg5");
      expandImg5.src = imgs.src;
      document.getElementById("demo5").innerHTML = desc;
      document.getElementById("demoNew5").innerHTML = desc2;
      document.getElementById("name5").innerHTML = empName;
   //    document.getElementById("designation5").innerHTML = empDesignation;
      expandImg5.parentElement.style.display = "block";
       document.getElementById('icons-team5').style.display = 'block';
       document.getElementById('icons-team5-close').style.display = 'block';
     //  expandedImg.parentElement.style.display = "none";
      expandedImg3.parentElement.style.display = "none";
      expandedImg4.parentElement.style.display = "none";
      expandedImg2.parentElement.style.display = "none";
      expandedImg6.parentElement.style.display = "none";
      expandedImg7.parentElement.style.display = "none";
      expandedImg8.parentElement.style.display = "none"; 
      expandedImg9.parentElement.style.display = "none";
      //expandedImg10.parentElement.style.display = "none";
      expandedImg10.parentElement.style.display = "none";
      expandedImg11.parentElement.style.display = "none";
      expandedImg12.parentElement.style.display = "none";
    }
    function teamMemberPics6(imgs,desc,desc2,empName,empDesignation) {
     document.getElementById('teamHid').style.display = 'block';
    document.getElementById('icons-team6').style.display = 'none';
    document.getElementById('icons-team6-close').style.display = 'none';
      var expandImg6 = document.getElementById("expandedImg6");
      expandImg6.src = imgs.src;
      document.getElementById("demo6").innerHTML = desc;
      document.getElementById("demoNew6").innerHTML = desc2;
      document.getElementById("name6").innerHTML = empName;
   //    document.getElementById("designation6").innerHTML = empDesignation;
      expandImg6.parentElement.style.display = "block";
       document.getElementById('icons-team6').style.display = 'block';
       document.getElementById('icons-team6-close').style.display = 'block';
     //  expandedImg.parentElement.style.display = "none";
      expandedImg3.parentElement.style.display = "none";
      expandedImg4.parentElement.style.display = "none";
      expandedImg5.parentElement.style.display = "none";
      expandedImg2.parentElement.style.display = "none";
      expandedImg7.parentElement.style.display = "none";
      expandedImg8.parentElement.style.display = "none"; 
      expandedImg9.parentElement.style.display = "none";
     // expandedImg10.parentElement.style.display = "none";
     expandedImg10.parentElement.style.display = "none";
     expandedImg11.parentElement.style.display = "none";
     expandedImg12.parentElement.style.display = "none";
    }
     function teamMemberPics7(imgs,desc,desc2,empName,empDesignation) {
      document.getElementById('teamHid7').style.display = 'block';
    document.getElementById('icons-team7').style.display = 'none';
    document.getElementById('icons-team7-close').style.display = 'none';
      var expandImg7 = document.getElementById("expandedImg7");
      expandImg7.src = imgs.src;
      document.getElementById("demo7").innerHTML = desc;
      document.getElementById("demoNew7").innerHTML =desc2;
      document.getElementById("name7").innerHTML = empName;
   //    document.getElementById("designation7").innerHTML = empDesignation;
      expandImg7.parentElement.style.display = "block";
       document.getElementById('icons-team7').style.display = 'block';
       document.getElementById('icons-team7-close').style.display = 'block';
        expandedImg6.parentElement.style.display = "none";
        expandedImg5.parentElement.style.display = "none";
      //expandedImg.parentElement.style.display = "none";
       expandedImg2.parentElement.style.display = "none";
        expandedImg4.parentElement.style.display = "none";
        expandedImg3.parentElement.style.display = "none";
        expandedImg8.parentElement.style.display = "none"; 
        expandedImg9.parentElement.style.display = "none";
       // expandedImg10.parentElement.style.display = "none";
       expandedImg10.parentElement.style.display = "none";
       expandedImg11.parentElement.style.display = "none";
       expandedImg12.parentElement.style.display = "none";
    }
   
    function teamMemberPics8(imgs,desc,desc2,empName,empDesignation) {
      document.getElementById('teamHid8').style.display = 'block';
      document.getElementById('icons-team8').style.display = 'none';
     document.getElementById('icons-team8-close').style.display = 'none';
      var expandImg8 = document.getElementById("expandedImg8");
      expandImg8.src = imgs.src;
      document.getElementById("demo8").innerHTML = desc;
      document.getElementById("demoNew8").innerHTML = desc2;
      document.getElementById("name8").innerHTML = empName;
   //    document.getElementById("designation8").innerHTML = empDesignation;
      expandImg8.parentElement.style.display = "block";
       document.getElementById('icons-team8').style.display = 'block';
       document.getElementById('icons-team8-close').style.display = 'block';
       expandedImg7.parentElement.style.display = "none";
        expandedImg6.parentElement.style.display = "none";
        expandedImg5.parentElement.style.display = "none";
       //expandedImg.parentElement.style.display = "none";
       expandedImg2.parentElement.style.display = "none";
        expandedImg4.parentElement.style.display = "none";
        expandedImg3.parentElement.style.display = "none";
        expandedImg9.parentElement.style.display = "none";
        //expandedImg10.parentElement.style.display = "none";
        expandedImg10.parentElement.style.display = "none";
        expandedImg11.parentElement.style.display = "none";
        expandedImg12.parentElement.style.display = "none";
    }
    function teamMemberPics9(imgs,desc,desc2,empName,empDesignation) {
      document.getElementById('teamHid9').style.display = 'block';
      document.getElementById('icons-team9').style.display = 'none';
     document.getElementById('icons-team9-close').style.display = 'none';
      var expandImg9 = document.getElementById("expandedImg9");
      expandImg9.src = imgs.src;
      document.getElementById("demo9").innerHTML = desc;
      document.getElementById("demoNew9").innerHTML = desc2;
      document.getElementById("name9").innerHTML = empName;
   //    document.getElementById("designation8").innerHTML = empDesignation;
      expandImg9.parentElement.style.display = "block";
       document.getElementById('icons-team9').style.display = 'block';
       document.getElementById('icons-team9-close').style.display = 'block';
       expandedImg7.parentElement.style.display = "none";
        expandedImg6.parentElement.style.display = "none";
        expandedImg5.parentElement.style.display = "none";
       //expandedImg.parentElement.style.display = "none";
       expandedImg2.parentElement.style.display = "none";
        expandedImg4.parentElement.style.display = "none";
        expandedImg3.parentElement.style.display = "none";
        expandedImg8.parentElement.style.display = "none";
        expandedImg10.parentElement.style.display = "none";
        expandedImg11.parentElement.style.display = "none";
        expandedImg12.parentElement.style.display = "none";
    }
   
   function teamMemberPics11(imgs,desc,desc2,empName,empDesignation) {
      document.getElementById('teamHid11').style.display = 'block';
      document.getElementById('icons-team11').style.display = 'none';
     document.getElementById('icons-team11-close').style.display = 'none';
      var expandImg11 = document.getElementById("expandedImg11");
      expandImg11.src = imgs.src;
      document.getElementById("demo11").innerHTML = desc;
      document.getElementById("demoNew11").innerHTML = desc2;
      document.getElementById("name11").innerHTML = empName;
   //    document.getElementById("designation8").innerHTML = empDesignation;
      expandImg11.parentElement.style.display = "block";
       document.getElementById('icons-team11').style.display = 'block';
       document.getElementById('icons-team11-close').style.display = 'block';
        expandedImg7.parentElement.style.display = "none";
        expandedImg6.parentElement.style.display = "none";
        expandedImg5.parentElement.style.display = "none";
       //expandedImg.parentElement.style.display = "none";
       expandedImg2.parentElement.style.display = "none";
        expandedImg4.parentElement.style.display = "none";
        expandedImg3.parentElement.style.display = "none";
        expandedImg8.parentElement.style.display = "none";
        expandedImg9.parentElement.style.display = "none";
        expandedImg10.parentElement.style.display = "none";
        expandedImg12.parentElement.style.display = "none";
    }
    
	 function teamMemberPics12(imgs,desc,desc2,empName,empDesignation) {
      document.getElementById('teamHid11').style.display = 'block';
      document.getElementById('icons-team12').style.display = 'none';
     document.getElementById('icons-team12-close').style.display = 'none';
      var expandImg12 = document.getElementById("expandedImg12");
      expandImg12.src = imgs.src;
      document.getElementById("demo12").innerHTML = desc;
      document.getElementById("demoNew12").innerHTML = desc2;
      document.getElementById("name12").innerHTML = empName;
   //    document.getElementById("designation8").innerHTML = empDesignation;
      expandImg12.parentElement.style.display = "block";
       document.getElementById('icons-team12').style.display = 'block';
       document.getElementById('icons-team12-close').style.display = 'block';
        expandedImg7.parentElement.style.display = "none";
        expandedImg6.parentElement.style.display = "none";
        expandedImg5.parentElement.style.display = "none";
       //expandedImg.parentElement.style.display = "none";
       expandedImg2.parentElement.style.display = "none";
        expandedImg4.parentElement.style.display = "none";
        expandedImg3.parentElement.style.display = "none";
        expandedImg8.parentElement.style.display = "none";
        expandedImg9.parentElement.style.display = "none";
        expandedImg10.parentElement.style.display = "none";
        //expandedImg12.parentElement.style.display = "none";
    }
	
   //  function teamMemberPics10(imgs,desc,empName,empDesignation) {
   //    document.getElementById('teamHid10').style.display = 'block';
   //    document.getElementById('icons-team10').style.display = 'none';
   //   document.getElementById('icons-team10-close').style.display = 'none';
   //    var expandImg10 = document.getElementById("expandedImg10");
   //    expandImg10.src = imgs.src;
   //    document.getElementById("demo10").innerHTML = desc;
   //    document.getElementById("name10").innerHTML = empName;
   // //    document.getElementById("designation8").innerHTML = empDesignation;
   // expandImg10.parentElement.style.display = "block";
   //     document.getElementById('icons-team10').style.display = 'block';
   //     document.getElementById('icons-team10-close').style.display = 'block';
   //     expandedImg7.parentElement.style.display = "none";
   // 	 expandedImg6.parentElement.style.display = "none";
   //      expandedImg5.parentElement.style.display = "none";
   //     //expandedImg.parentElement.style.display = "none";
   //     expandedImg2.parentElement.style.display = "none";
   //      expandedImg4.parentElement.style.display = "none";
   // 	 expandedImg3.parentElement.style.display = "none";
   //      expandedImg8.parentElement.style.display = "none";
   //      expandedImg9.parentElement.style.display = "none";
        
   //  }
   
    window.onload = function() {
     document.getElementById('icons-team').style.display = 'none';
     document.getElementById('icons-team-close').style.display = 'none';
      document.getElementById('icons-team2').style.display = 'none';
     document.getElementById('icons-team2-close').style.display = 'none';
      document.getElementById('icons-team3').style.display = 'none';
     document.getElementById('icons-team3-close').style.display = 'none';
   };