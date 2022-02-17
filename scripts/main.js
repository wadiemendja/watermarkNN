  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "YOUR-API-KEY",
    authDomain: "example.firebaseapp.com",
    databaseURL: "https://example.firebaseio.com",
    projectId: "YOUR-PROJECT-ID",
    storageBucket: "example.appspot.com",
    messagingSenderId: "messagingSenderId",
    appId: "YOUR-appId"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)   
  var database = firebase.database()
  var storage = firebase.storage()

  database.ref('products').once('value',function(snapshot) {
    // rendering the list of products
    snapshot.forEach(function(child){
      var product = child.val()
      document.getElementById('list').innerHTML+='<tr class="tr"><td>'+product.id+'</td><td><img src='+product.img+'></td><td>'+product.name+'</td><td>'+product.type+'</td><td>'+product.price+' DZD</td><td>'+product.quantity+'</td><td><input type="checkbox" class="ckeck-boxs" id="'+product.id+'"></td></tr>'
    })

    function popAlert(message){
      var alertDiv=document.getElementById('alert')
      alertDiv.style.display='block'
      alertDiv.innerHTML=message
      setTimeout(() => {
        alertDiv.innerHTML=''
        alertDiv.style.display='none'
      },2500)
    }

    // delete a product
    document.getElementById('delete').addEventListener("click",function(){
      var thereIs=false
      snapshot.forEach(function(child){
        var checkBox = document.getElementById(child.val().id)
        if(checkBox.checked) thereIs=true
      })
      if (!thereIs) popAlert("select a product to delete")
      else {
        snapshot.forEach(function(child){
          var checkBox = document.getElementById(child.val().id)
          if(checkBox.checked){
            database.ref('products/'+child.key).remove()
            checkBox.parentNode.parentNode.remove()
            location.replace("home.html")
          }
        })
      }
    })

    // Seach for a product 
    document.getElementById('search-btn').addEventListener("click",function(){
      var searchInput = document.getElementById('search-input').value.trim().toLowerCase()
      if (searchInput=="") popAlert("type something !!!")
      else{
        var gotIt =false
        snapshot.forEach(function(child){
          var element = document.getElementById(child.val().id)
          var type = child.val().type
          type.toLowerCase()
          var name = child.val().name.toLowerCase()
          if(type!=searchInput && name!=searchInput && child.val().id!=searchInput)
            element.parentNode.parentNode.style.visibility= "collapse"
          else{
            element.parentNode.parentNode.style.visibility= "visible"
            gotIt=true
          }
        })
        var backToList=document.getElementById('goBack') 
        backToList.style.display='block'
        backToList.addEventListener("click",function(){location.replace("home.html")})
        if (!gotIt){
          document.getElementById('none').innerHTML='Nothing Found !!!'
        }else document.getElementById('none').innerHTML=""
      }
    })

    // add a product
    document.getElementById('add').addEventListener("click",function(){
        document.getElementById('addToUpdate').innerHTML='<button id="addbtn" class="btn btn-success">Add</button>'
        document.getElementById('pop').style.display="block"
        document.getElementById('productName').value=""
        document.getElementById('productType').value=""
        document.getElementById('productPrice').value="0"
        document.getElementById('productQ').value="1"
        document.getElementById('uploadedImage').src=""
        document.getElementById('imgLab').innerHTML="Choose Image"
        document.getElementById('addbtn').addEventListener("click",function(){
          var ids=[]
          snapshot.forEach(function(child){
            ids.push(child.val().id)        
          })
          var lastId
          if(ids[ids.length-1]==undefined) lastId=1
          else lastId=ids[ids.length-1]+1
          if(!uploadChecker) imgURL="https://firebasestorage.googleapis.com/v0/b/graduation-note.appspot.com/o/img%2Fdefault.jpg?alt=media&token=590b6c8d-70da-4a9b-95db-2420cb83a801"
          var productName =document.getElementById('productName')
          var productType =document.getElementById('productType')
          var productQ =document.getElementById('productQ')
          var productPrice =document.getElementById('productPrice')
          productName.addEventListener("input",function(){productName.style.borderColor="#dde1e5"})
          productType.addEventListener("input",function(){productType.style.borderColor="#dde1e5"})
          productQ.addEventListener("input",function(){productQ.style.borderColor="#dde1e5"})
          if(productName.value=="")productName.style.border="solid 1px red"
          else{
            var data = {
              id:lastId,
              img:imgURL,
              name:productName.value.trim(),
              quantity:productQ.value,
              price:productPrice.value,
              type:productType.value.trim()
            }
            database.ref('products').push(data)
            location.replace("home.html")
          }
        })
    })
    document.getElementById('cancel').addEventListener("click",function(){
      document.getElementById('pop').style.display="none"
    })
    var imgURL
    var uploadChecker=false
    document.getElementById('image').addEventListener("change",function(){
      var file = document.getElementById("image").files[0]
      var UploadTask = storage.ref('img/'+file.name).put(file)
      UploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        var prog = document.getElementById('prog')
        prog.style.display = "inline"
        prog.value=progress
        if (progress==100){
          var imgRef=storage.ref('img/'+file.name)
          imgRef.getDownloadURL().then(function(url) {
            var uploadedImage= document.getElementById('uploadedImage')
            uploadedImage.src= url
            uploadedImage.style.display="inline"
            imgURL=url
            uploadChecker=true
          })
        }
      })
    })

    // update a product
    document.getElementById('update').addEventListener("click",function(){
      var index=0
      snapshot.forEach(function(child){
        var checkBox = document.getElementById(child.val().id)
        if(checkBox.checked) index++
      })
      if (index==0) popAlert("select a product to update")
      else if (index!=1) popAlert("select just one product to update")
      else {
        snapshot.forEach(function(child){
          var checkBox=document.getElementById(child.val().id)
          if (checkBox.checked){
            document.getElementById('pop').style.display="block"
            var productName =document.getElementById('productName')
            var productType =document.getElementById('productType')
            var productQ =document.getElementById('productQ')
            var productPrice =document.getElementById('productPrice')  
            productName.value=child.val().name
            productType.value=child.val().type
            productQ.value=child.val().quantity
            productPrice.value=child.val().price
            document.getElementById('imgLab').innerHTML="Change Image"
            document.getElementById('addToUpdate').innerHTML='<button id="updatebtn" class="btn btn-success">update</button>'
            document.getElementById('updatebtn').addEventListener("click",function(){
              var data = {
                id:child.val().id,
                img:imgURL,
                name:productName.value.trim(),
                quantity:productQ.value,
                price:productPrice.value,
                type:productType.value.trim()
              }
              if (imgURL==undefined) data.img=child.val().img
              database.ref('products/'+child.key).update(data)
              location.replace("home.html")
            })
          }
        })
      }
    })

  })