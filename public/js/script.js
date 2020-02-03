function starter(){
    //Socket initialization
    const socket = io();
    document.querySelector('form').addEventListener("submit", (event) => {
      event.preventDefault();
      socket.emit('chat message', document.querySelector('#m').value);
      document.querySelector('#m').value = '';
      return false;
    });
    
    socket.on('connect', (name) => {
      let name = prompt("Enter your user name: ");
      const li = document.createElement('li');
      const textnode = document.createTextNode(`${name} is connected`);
      li.appendChild(textnode);

      document.querySelector('#messages').appendChild(li);
    });

    socket.on('disconnect', function(){
      const li = document.createElement("li");
      const text = document.createTextNode('User Disconnected');
      li.appendChild(text);

      document.querySelector('#messages').appendChild(li);
    });

    socket.on('chat message', function(msg){
      const li = document.createElement('li');
      const text = document.createTextNode(msg);
      li.appendChild(text);

      document.querySelector('#messages').appendChild(li);
    });
  }

  starter();