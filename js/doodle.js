      var curColor = 'rgb(0, 0, 0)';
      var curSize = 10;
      var fontSize = 4;
      var fontFamily = "Arial";
      var paint = false;
      var text = false;
      
      var drawColor = new Array();
      var drawSize = new Array();
      var drawX = new Array();
      var drawY = new Array();
      var drawDrag = new Array();
      var usedColors = new Array();
      var drawText = new Array();
      var drawFontSize = new Array();
      var drawFontFamily = new Array();
      var drawFontColor = new Array();
      var drawTextX = new Array();
      var drawTextY = new Array();
      
      
      var ctx = document.getElementById('doodle').getContext("2d");
      var cpCTX = document.getElementById('colorPicker').getContext('2d');
      
      showPicker();
      fontSizeOptions();
      
      function showPicker(){
        var cp = new Image();
        cp.src = "/images/Hue_alpha_2.png";
        cp.onload = function(){
          cpCTX.drawImage(cp, 0, 0);
        }
      }
      
      $('#colorPicker').mousedown(function(e){
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var data = cpCTX.getImageData(x,y,1,1).data;
        curColor = 'rgb(' + data[0] + ', ' + data[1] + ', ' + data[2] + ')';
        $('#curColor').css('background-color', curColor);
        if (text){
          $('#insertText').css('color', curColor);
        }
      });
      
      $(document).on('click', '.colors', (function() {
        curColor = $(this).css('background-color');
        $('#curColor').css('background-color', curColor);
        if(text) {
          $('#insertText').css('color', curColor);
        }
      }));
      
      $('.size').click(function() {
        curSize = $(this).val();
      });
      
      $('#text').click(function() {
        if(!text) {
          text = true;
          $('#inputText').append(
            "<textarea id='insertText' style='width:280px; height: 100px; color: " 
            + curColor + "' placeholder='type in your text and then " 
            + "click the canvas to place it...'>"
            + "</textarea>");
        } else {
          text = false;
          $('#insertText').remove();
        }
      });
      
      $('#clear').click(function(){
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawX.splice(0);
        drawY.splice(0);
        drawDrag.splice(0);
        drawColor.splice(0);
        drawSize.splice(0);
        usedColors.splice(0);
        drawText.splice(0);
        drawTextX.splice(0);
        drawTextY.splice(0);
        drawFontColor.splice(0);
        drawFontFamily.splice(0);
        drawFontSize.splice(0);
        $('.colors').remove();
      });
      
      var link = document.getElementById('download');
      link.addEventListener('click', function(e){
        var pic = document.getElementById('doodle');
        var download = pic.toDataURL();
        link.href = download;
      });
      
      $('#doodle').mousedown(function(e){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        
        if (!text){
          var newColor = true;
  
          if (usedColors.length){
            $.each(usedColors, function(index, value) {
              if (curColor == value) {
                newColor = false;
              }
            });
          }
        
          if (newColor) {
            $('#usedColors').append(
              "<div class='colors' style='background-color: "
              + curColor + "'></div>");
            usedColors.push(curColor);
          }
          
          paint = true;
          addDraw(mouseX, mouseY);
        } else {
          var string = $('#insertText').val();
          addText(mouseX, mouseY, string);
          text = false;
          $('#insertText').remove();
        }
      });
      
      $('#doodle').mousemove(function(e){
        if(paint) {
          addDraw(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        }
      });
      
      $('#doodle').mouseup(function(e){
        paint = false;
      });
      
      $('#doodle').mouseleave(function(e){
        paint = false;
      });
      
      function addDraw(x, y, dragging){
        drawX.push(x);
        drawY.push(y);
        drawDrag.push(dragging);
        drawColor.push(curColor);
        drawSize.push(curSize);
        redraw();
      }
      
      function addText(x, y, string) { 
        drawText.push(string);
        drawTextX.push(x);
        drawTextY.push(y);
        drawFontColor.push(curColor);
        drawFontSize.push(fontSize);
        drawFontFamily.push(fontFamily);
        redraw();
      }
      
      function redraw(){
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        ctx.lineJoin = "round";
        
        for (var i = 0; i < drawX.length; i++) {
          ctx.beginPath();
          
          if(drawDrag[i] && i) {
            ctx.moveTo(drawX[i-1], drawY[i-1]);
          } else {
            ctx.moveTo(drawX[i]-1, drawY[i]);
          }
          
          ctx.lineTo(drawX[i], drawY[i]);
          ctx.closePath();
          ctx.strokeStyle = drawColor[i];
          ctx.lineWidth = drawSize[i];
          ctx.stroke();
        }
        
        for (var i = 0; i < drawText.length; i++) {
          var string = drawText[i];
          ctx.fillStyle = drawFontColor[i];
          ctx.font = drawFontSize[i] + "px " + drawFontFamily[i];
          ctx.fillText(string, drawTextX[i], drawTextY[i]);
        }
      }
      
      function fontSizeOptions(){
        for (var i = 4; i <= 200; i++){
          var opt = document.createElement("option");
          opt.value = i;
          opt.text = i + "px";
          $('#fontSize').append(opt);
        }
      }
      
      $('#fontSize').change(function() {
        fontSize = $(this).val();
      });
      
      $('#fontFamily').change(function() {
        fontFamily = $(this).val();
      });
      
      $(document).on('change', '#fontSize', (function() {
        $('#insertText').css('font-size', fontSize + "px");
      }));
      
      $(document).on('click', '#fontFamily', (function() {
        $('#insertText').css('font-family', fontFamily);
      }));