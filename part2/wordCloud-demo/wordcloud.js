var filename ;
$(document).ready(function(){
    $("#button1").click(function(){
        $("#chart").empty();
        $("#chart1").empty();
filename = $('#selector').val().toLowerCase() ;

if(filename==="zuck" || filename==="mark"|| filename==="zuckerberg" || filename==="facebook")
   filename="zuckerberg" ;
else if(filename==="cambridge" || filename==="analytica" || filename==="facebookscandal"||filename==="privacy"||filename==="intrusion" || filename==="dataprivacy" || filename==="markscandal")
          filename="cambridgeanalytica" ;

else
   filename="word";



var fill = d3.scale.category20();
    d3.csv(filename+".csv", function(d) {
        return {
          text: d.word,
          size: +d.count

        }
      },
      function(data) {
        d3.layout.cloud().size([960, 600]).words(
          data
          )
          .rotate(function() {
            return ~~(Math.random() * 2) * 90;
          })
          .font("Impact")
          .fontSize(function(d) {
            return d.size;
          })
          .on("end", draw)
          .start();

        function draw(words) {
          console.log(words);

          d3.select("#chart").append("svg")
            .attr("width", 960)
            
            .attr("height", 600)
            .attr("align","center")
            .append("g")
            .attr("transform", "translate(150,150)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) {
              return d.size + "px";
            })
            .style("font-family", "Impact")
            .style("fill", function(d, i) {
              return fill(i);
            })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) {
              return d.text;
            });
        }
      


     });
console.log(filename);
if(filename==="zuckerberg")
   filename="fb" ;
else if(filename==="cambridgeanalytica")
          filename="MarkZuckerberDataBreachNY" ;

else
   filename="word";

console.log(filename);

var fill = d3.scale.category20();
    d3.csv(filename+".csv", function(d) {
        return {
          text: d.word,
          size: +d.count

        }
      },
      function(data) {
        d3.layout.cloud().size([960, 600]).words(
          data
          )
          .rotate(function() {
            return ~~(Math.random() * 2) * 90;
          })
          .font("Impact")
          .fontSize(function(d) {
            return d.size + 10;
          })
          .on("end", draw)
          .start();

        function draw(words) {
          console.log(words);

          d3.select("#chart1").append("svg")
            .attr("width", 960)
            
            .attr("height", 600)
            .attr("align","center")
            .append("g")
            .attr("transform", "translate(150,150)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) {
              return d.size  + "px";
            })
            .style("font-family", "Impact")
            .style("fill", function(d, i) {
              return fill(i);
            })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) {
              return d.text;
            });
        }
      


     });





    });//end of onlcick





 $("svg").css({top: 50, left: 50, position:'absolute' });
$("svg").each(function(){
  this.width = this.parentNode.width;
  this.height = this.parentNode.height;
});

});

