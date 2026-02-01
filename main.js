const titleField = document.getElementById('title');
const taskField = document.getElementById('note');
const addBtn = document.getElementById('btn');
const warnInfo = document.getElementsByTagName('p');
const taskBox = document.querySelector('.task-box');
const darkModeBtn = document.getElementById('dark-mode-btn');
const eff = document.getElementById('ball');


const datad = [];
let mode = 1;


window.addEventListener('load', function() {
  
  
  titleField.value = localStorage.getItem('savedTitle');
  taskField.value = localStorage.getItem('savedNote');
  if (localStorage.getItem('theme') !== null) {
    mode = Number(JSON.parse(localStorage.getItem('theme')));
    
    // IF MODE IS 0 (DARK MODE)
    if (mode === 0) {
      eff.style.transform = 'translateX(108%) translateY(-50%)';
      document.body.style.background = '#121417';
      inputBox.style.background = '#1E2128';
      inputBox.style.border = '1px solid rgba(255 , 255 , 255 , 0.05)';
      inputBox.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      titleField.style.color = '#fff';
      taskField.style.color = '#fff';
      addBtn.style.background = 'linear-gradient(135deg, #5C9DFF 0%, #3A7BD5 100%)';
      addBtn.style.boxShadow = '0 4px 15px rgba(92, 157, 255, 0.4)';
      eff.style.background = '#5C9DFF';
      toggleBtn.style.background = '#1E1E1E';
      toggleBtn.style.border = '1px solid rgba(255 , 255 , 255 , .2)';
      toggleBtn.style.boxShadow = '0 6px 20px rgba(92, 157, 255, 0.6)';
      taskOrTitleText[0].style.color = '#5C9DFF';
      taskOrTitleText[1].style.color = '#5C9DFF';
      warnInfo[0].style.color = '#FF6B6B';
      warnInfo[1].style.color = '#FF6B6B';
      header.style.color = '#D3D3D3';
    }
    // IF MODE IS 1 (LIGHT MODE)
    else {
      eff.style.transform = 'translateX(0%) translateY(-50%)';
      document.body.style.background = 'hsla(240, 11%, 96%, 1)';
      inputBox.style.background = 'hsla(235, 0%, 100%, 0.82)';
      inputBox.style.border = 'none';
      inputBox.style.boxShadow = '-1px 1px 5px hsla(201, 0%, 0%, 0.42)';
      addBtn.style.background = 'hsla(225, 73%, 57%, 1)';
      eff.style.background = 'hsla(225, 73%, 57%, 1)';
      taskOrTitleText[0].style.color = 'hsla(225, 73%, 57%, 1)';
      taskOrTitleText[1].style.color = 'hsla(225, 73%, 57%, 1)';
      warnInfo[0].style.color = 'hsla(0, 100%, 51%, 1)';
      warnInfo[1].style.color = 'hsla(0, 100%, 51%, 1)';
      titleField.style.color = '#000';
      taskField.style.color = '#000';
      toggleBtn.style.background = '#fff';
      toggleBtn.style.boxShadow = '0px 0px 2px hsla(221, 0%, 0%, 0.52)';
      header.style.color = 'hsla(225, 73%, 57%, 1)';
    }
  }
  
  let res = localStorage.getItem('Tasks');
  res = JSON.parse(res);
  
  if (res) {
    for (let d of res) {
      const div = document.createElement('div');
      div.setAttribute('class', 'task');
      const h2 = document.createElement('h2');
      h2.innerHTML = d.head;
      div.appendChild(h2);
      const h4 = document.createElement('h4');
      h4.innerHTML = d.text;
      div.appendChild(h4);
      const div2 = document.createElement('div');
      div2.setAttribute('class', 'task-btn');
      const button1 = document.createElement('button');
      button1.innerHTML = 'Delete';
      button1.setAttribute('class', `button1`);
      const button2 = document.createElement('button');
      button2.innerHTML = 'Done';
      button2.setAttribute('class', 'button2');
      div2.appendChild(button1);
      div2.appendChild(button2);
      div.appendChild(div2);
      // Inside your load loop for res:
      if (mode === 0) {
        div.style.background = '#1E2128';
        div.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
        div.style.borderLeft = '4px solid #5C9DFF';
      } else {
        div.style.background = 'hsla(225, 73%, 57%, 1)';
        div.style.boxShadow = '0 0 3px hsla(210, 0%, 0%, 0.3)';
        div.style.borderLeft = 'none';
      }
      
      const deleteBtn = div.querySelector(`.button1`);
      const doneBtn = div.querySelector('.button2');
      
      deleteBtn.addEventListener('click', () => {
        div.style.opacity = 0;
        setTimeout(() => div.remove(), 600);
        let raw = localStorage.getItem('Tasks');
        raw = JSON.parse(raw);
        const updatedTask = raw.filter((value) => value.head !== d.head);
        localStorage.setItem('Tasks', JSON.stringify(updatedTask));
      })
      
      doneBtn.addEventListener('click', () => {
        div.style.opacity = '0.5';
        h2.style.textDecoration = 'line-through';
        h4.style.textDecoration = 'line-through';
        d.done = 1;
        let raw = localStorage.getItem('Tasks');
        raw = JSON.parse(raw);
        const updated = raw.filter((v) => v.head !== d.head);
        updated.push(d);
        localStorage.setItem('Tasks', JSON.stringify(updated));
        
      })
      
      if (d.done) {
        div.style.opacity = '0.5';
        h2.style.textDecoration = 'line-through';
        h4.style.textDecoration = 'line-through';
      }
      taskBox.insertBefore(div, taskBox.firstElementChild);
    }
  }
  
  
});


titleField.addEventListener('input', function() {
  warnInfo[0].innerHTML = '';
  localStorage.setItem('savedTitle', titleField.value);
  
});




taskField.addEventListener('input', function() {
  warnInfo[1].innerHTML = '';
  localStorage.setItem('savedNote', taskField.value);
});



addBtn.addEventListener('click', function() {
  
  
  let title = titleField.value.trim();
  let note = taskField.value.trim();
  
  
  if (!title && !note) {
    for (let value of warnInfo) {
      value.innerHTML = '<i class="fa-solid fa-circle-info"></i> text field cannot be empty.';
    }
    titleField.focus();
    return;
  } else if (title && !note) {
    warnInfo[1].innerHTML = '<i class="fa-solid fa-circle-info"></i> note text field cannot be empty.';
    taskField.focus();
    return;
  } else if (!title && note) {
    warnInfo[0].innerHTML = '<i class="fa-solid fa-circle-info"></i> title text field cannot be empty.';
    titleField.focus();
    return;
  }
  
  const obj = {};
  
  obj.head = title;
  obj.text = note;
  
  
  if (localStorage.getItem('Tasks')) {
    let arr = JSON.parse(localStorage.getItem('Tasks'));
    for (let d of arr) {
      if (obj.head === d.head) {
        warnInfo[0].innerHTML = '<i class="fa-solid fa-circle-info"></i> task/title already exist.';
        setTimeout(function() {
          warnInfo[0].innerHTML = '';
        }, 2100);
        
        return;
      }
    }
  }
  
  
  const div = document.createElement('div');
  div.setAttribute('class', 'task');
  const h2 = document.createElement('h2');
  h2.innerHTML = obj.head;
  div.appendChild(h2);
  const h4 = document.createElement('h4');
  h4.innerHTML = obj.text;
  div.appendChild(h4);
  const div2 = document.createElement('div');
  div2.setAttribute('class', 'task-btn');
  const button1 = document.createElement('button');
  button1.innerHTML = 'Delete';
  button1.setAttribute('class', 'button1');
  const button2 = document.createElement('button');
  button2.innerHTML = 'Done';
  button2.setAttribute('class', 'button2');
  div2.appendChild(button1);
  div2.appendChild(button2);
  div.appendChild(div2);
  
  if (mode === 0) {
    div.style.background = '#1E2128';
    div.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    div.style.borderLeft = '4px solid #5C9DFF';
    // Add any other dark styles for the task here (like text color)
  } else {
    div.style.background = 'hsla(225, 73%, 57%, 1)';
    div.style.boxShadow = '0 0 3px hsla(210, 0%, 0%, 0.3)';
    div.style.borderLeft = 'none';
    // or your light mode color
  }
  
  const deleteBtn = div.querySelector('.button1');
  const doneBtn = div.querySelector('.button2');
  
  deleteBtn.addEventListener('click', () => {
    div.style.pointerEvents = 'none';
    div.style.opacity = 0;
    setTimeout(() => div.remove(), 600);
    let raw = localStorage.getItem('Tasks');
    raw = JSON.parse(raw);
    const updatedTask = raw.filter((value) => value.head !== obj.head);
    localStorage.setItem('Tasks', JSON.stringify(updatedTask));
  })
  
  doneBtn.addEventListener('click', () => {
    div.style.opacity = '0.5';
    h2.style.textDecoration = 'line-through';
    h4.style.textDecoration = 'line-through';
    obj.done = 1;
    let raw = localStorage.getItem('Tasks');
    raw = JSON.parse(raw);
    const updated = raw.filter((v) => v.head !== obj.head);
    updated.push(obj);
    localStorage.setItem('Tasks', JSON.stringify(updated));
    
  })
  taskBox.insertBefore(div, taskBox.firstElementChild);
  let correctV = JSON.stringify(datad);
  if (!localStorage.getItem('Tasks')) {
    localStorage.setItem('Tasks', correctV);
  }
  let res = localStorage.getItem('Tasks');
  
  let newData = JSON.parse(res);
  newData.push(obj);
  
  localStorage.setItem('Tasks', JSON.stringify(newData))
  
  
});
const inputBox = document.querySelector('.input-box');
const header = document.getElementById('hh');

const toggleBtn = document.querySelector('.dark-mode button')
const taskOrTitleText = document.querySelectorAll('.input-box h4');

darkModeBtn.addEventListener('click', function() {
  // 1. Select all tasks currently in the list
  const allTasks = document.querySelectorAll('.task');
  
  if (mode === 1) { // Currently Light, switching to DARK
    mode = 0; // Update state first
    
    eff.style.transform = 'translateX(108%) translateY(-50%)';
    document.body.style.background = '#121417';
    inputBox.style.background = '#1E2128';
    inputBox.style.border = '1px solid rgba(255 , 255 , 255 , 0.05)';
    inputBox.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    titleField.style.color = '#fff';
    taskField.style.color = '#fff';
    addBtn.style.background = 'linear-gradient(135deg, #5C9DFF 0%, #3A7BD5 100%)';
    addBtn.style.boxShadow = '0 4px 15px rgba(92, 157, 255, 0.4)';
    eff.style.background = '#5C9DFF';
    toggleBtn.style.background = '#1E1E1E';
    toggleBtn.style.border = '1px solid rgba(255 , 255 , 255 , .2)';
    toggleBtn.style.boxShadow = '0 6px 20px rgba(92, 157, 255, 0.6)';
    taskOrTitleText[0].style.color = '#5C9DFF';
    taskOrTitleText[1].style.color = '#5C9DFF';
    warnInfo[0].style.color = '#FF6B6B';
    warnInfo[1].style.color = '#FF6B6B';
    header.style.color = '#D3D3D3';
    
    // 2. Loop through and change existing tasks to dark
    allTasks.forEach(t => {
      t.style.background = '#1E2128'
      t.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
      t.style.borderLeft = '4px solid #5C9DFF';
    });
    
  } else { // Currently Dark, switching to LIGHT
    mode = 1; // Update state first
    
    eff.style.transform = 'translateX(0%) translateY(-50%)';
    document.body.style.background = 'hsla(240, 11%, 96%, 1)';
    inputBox.style.background = 'hsla(235, 0%, 100%, 0.82)';
    inputBox.style.border = 'none';
    inputBox.style.boxShadow = '-1px 1px 5px hsla(201, 0%, 0%, 0.42)';
    addBtn.style.background = 'hsla(225, 73%, 57%, 1)';
    eff.style.background = 'hsla(225, 73%, 57%, 1)';
    taskOrTitleText[0].style.color = 'hsla(225, 73%, 57%, 1)';
    taskOrTitleText[1].style.color = 'hsla(225, 73%, 57%, 1)';
    warnInfo[0].style.color = 'hsla(0, 100%, 51%, 1)';
    warnInfo[1].style.color = 'hsla(0, 100%, 51%, 1)';
    titleField.style.color = '#000';
    taskField.style.color = '#000';
    toggleBtn.style.background = '#fff';
    toggleBtn.style.boxShadow = '0px 0px 2px hsla(221, 0%, 0%, 0.52)';
    header.style.color = 'hsla(225, 73%, 57%, 1)';
    
    // 2. Loop through and change existing tasks to light
    allTasks.forEach(t => {
      t.style.background = 'hsla(225, 73%, 57%, 1)';
      t.style.boxShadow = '0 0 3px hsla(210, 0%, 0%, 0.3)';
      t.style.borderLeft = 'none';
    });
  }
  
  // 3. Save the NEW mode to localStorage
  localStorage.setItem('theme', JSON.stringify(mode));
});