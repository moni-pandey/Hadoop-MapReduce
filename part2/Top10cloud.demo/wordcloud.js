
var fill = d3.scale.category20();
    d3.csv("twitterTop10.csv", function(d) {
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
            return d.size/11;
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


var fill = d3.scale.category20();
    d3.csv("NYtop10.csv", function(d) {
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
            return d.size +15;
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

 $("svg").css({top: 50, left: 50, position:'absolute' });
$("svg").each(function(){
  this.width = this.parentNode.width;
  this.height = this.parentNode.height;});

