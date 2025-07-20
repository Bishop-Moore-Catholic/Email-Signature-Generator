function fitTextToWidth(ctx, text, maxWidth, fontFace = "futura-pt", maxFontSize = 24, minFontSize = 18) {
        let fontSize = maxFontSize;
        ctx.font = `${fontSize}px ${fontFace}`;

        while (ctx.measureText(text).width > maxWidth && fontSize > minFontSize) {
          fontSize--;
          ctx.font = `${fontSize}px ${fontFace}`;
        }

        return fontSize;
      }

      function generateSignature() {
        const canvas = document.getElementById('signatureCanvas');
        const ctx = canvas.getContext('2d');

        const imageElement = document.getElementById('generatedImage');
        const downloadBtn = document.getElementById('downloadBtn');

        const sal = document.getElementById('sal').value.trim();
        const name = document.getElementById('name').value.trim();
        const yr = document.getElementById('yr').value;
        const title1 = document.getElementById('title1').value.trim();
        const title2 = document.getElementById('title2').value.trim();
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value.trim();

        const background = new Image();
        background.src = './base.jpg';

        background.onload = function() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#00000";

          var nameHeight = 105;
          var title1Height = 140;

          if (title2 == '') {
            nameHeight = 140;
            title1Height = 172;
          }

          // NAME
          let fullName = `${sal} ${name} ${yr}`;
          let fittedFontSize = fitTextToWidth(ctx, fullName, 455, "futura-pt", 32, 28);
          ctx.font = `500 ${fittedFontSize}px futura-pt`;
          ctx.fillText(fullName, 284, nameHeight);

          // Title 1
          fittedFontSize = fitTextToWidth(ctx, title1, 465, "futura-pt", 24, 20);
          ctx.font = `400 ${fittedFontSize}px futura-pt`;
          ctx.fillText(title1, 284, title1Height);
          
          // Title 2
          fittedFontSize = fitTextToWidth(ctx, title2, 465, "futura-pt", 24, 20);
          ctx.font = `400 ${fittedFontSize}px futura-pt`;
          ctx.fillText(title2, 284, 172);

          // Phone and Email
          ctx.font = "300 24px futura-pt";
          if (phone != '') ctx.fillText(`, ext: ${phone}`, 440, 272);
          ctx.fillText(`${email}@bishopmoore.org`, 284, 299);

          // Convert canvas to image
          const dataURL = canvas.toDataURL("image/jpg");

          // Set image src
          imageElement.src = dataURL;
          imageElement.style.display = "block";

          // Set download link
          downloadBtn.href = dataURL;

          // Disable download on error
          const hasInvalidInputs = document.querySelector('input:invalid') !== null;
          if (hasInvalidInputs) {
            document.getElementById('btnTgt').disabled = true;
            document.getElementById('warning').style.display = 'block';
          } else {
            document.getElementById('btnTgt').disabled = false;
            document.getElementById('warning').style.display = 'none';
          }
        };

        background.onerror = function() {
          alert("Failed to load the background image. Make sure it supports CORS.");
        };
      }
      window.onload = function() {
        generateSignature();
      }