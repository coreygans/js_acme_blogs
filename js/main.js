const createElemWithText = (sname = "p",text = "", cname) => {

const newElement = document.createElement(sname);
 newElement.textContent = text;
 if(cname) newElement.classList.add(cname);
 return newElement;   

}

const createSelectOptions = (users) => {
 if(!users) return;
 userArray = [];
 for(let i = 0; i < users.length; i++){
    const optionUser =  document.createElement("option");
    optionUser.value = users[i]['id'];
    optionUser.textContent = users[i]['name'];
    userArray.push(optionUser); 
 }
return userArray;
}


const toggleCommentSection = (postId) => {
   if(!postId) return;
   const sectionSelect =  document.querySelector('section[data-post-id="' + postId + '"]');
   if(!sectionSelect) return null;
   sectionSelect.classList.toggle('hide');

   return sectionSelect;
}



const toggleCommentButton = (postId) => {
   if(!postId) return;
   const buttonSelect =  document.querySelector('button[data-post-id="' + postId + '"]');
   if(!buttonSelect) return null;
   const buttonToggle =  (buttonSelect.textContent == 'Show Comments' ? buttonSelect.textContent = 'Hide Comments' : buttonSelect.textContent = 'Show Comments');
   return buttonSelect;
}

const deleteChildElements = (parentElement) => {
   if(!parentElement?.tagName) return;
   let childVar = parentElement.lastElementChild;

   while (childVar){
      parentElement.removeChild(childVar);
      childVar = parentElement.lastElementChild;
   }
   return parentElement;

}

const addButtonListeners = () => {
   const buttonSelect =  document.querySelectorAll('main button');
   if(!buttonSelect) return;
   for(let i = 0; i < buttonSelect.length; i++){
      const button = document.querySelector('button');
      const postId = button.dataset.postId;
      button.addEventListener("click", function (e) {toggleComments(e, postId)}, false);
   }

   return buttonSelect;
}

addButtonListeners();

const removeButtonListeners = () => {
   const buttonSelect =  document.querySelectorAll('main button');
   if(!buttonSelect) return;
   for(let i = 0; i < buttonSelect.length; i++){
      const button = document.querySelector('button');
      const postId = button.dataset.postId;
      button.removeEventListener("click", function (e) {toggleComments(e, postId)}, false);
   }

   return buttonSelect;

}


const createComments = (jsonComments) => {


}


const populateSelectMenu = () => {


}


const getUsers = () => {


}

const getUserPosts = () => {


}

const getUser = () => {


}

const getPostComments = () => {


}

const displayComments = () => {


}

const createPosts = () => {


}

const displayPosts = () => {


}

const toggleComments = (event, postId) => {


}

const refreshPosts = () => {


}

const selectMenuChangeEventHandler = () => {


}

const initPage = () => {


}

const initApp = () => {


}