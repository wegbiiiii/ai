
    const scriptURL = "https://script.google.com/macros/s/AKfycbzPQs-hM9kvi2g9hVoovp-5VGxMnw-9njoYWIH9xqUFxIWwZUuDIdKP_YpLzzk8n5nnkg/exec"
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message sent successfully"
            setTimeout(function(){
                msg.innerHTML = ""
            },5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })
