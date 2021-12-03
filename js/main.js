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
   for(let i = 0; i < buttonSelect?.length; i++){
      const button = document.querySelector('button');
      const postId = button.dataset.postId;
      button.removeEventListener("click", function (e) {toggleComments(e, postId)}, false);
   }

   return buttonSelect;

}


const createComments = (jsonComments) => {
 if(!jsonComments) return;
   const fragment = document.createDocumentFragment();
   for(let i = 0; i < jsonComments.length; i++){
      const article = document.createElement('article');
      const h3 = createElemWithText('h3', jsonComments[i].name);
      const articleBody = createElemWithText('p', jsonComments[i].body);
      const email = createElemWithText('p', `From: ${jsonComments[i].email}`);
      article.append(h3);
      article.append(articleBody);
      article.append(email);   
      fragment.append(article);
   }
   return fragment;
}


const populateSelectMenu = (users) => {
if(!users) return;
const selectMenu = document.getElementById('selectMenu');
const createOptions = createSelectOptions(users);
for(let i = 0; i < createOptions?.length; i++){
   selectMenu.append(createOptions);
}
return selectMenu;
}


const getUsers = async () => {
   try{
      const userData = await fetch('https://jsonplaceholder.typicode.com/users');
      return userData.json();
   }
   catch(err){
      return err;
   }
}

const getUserPosts = async (userid) => {
   if(!userid) return;
   try{
      const userPosts = await fetch(`https://jsonplaceholder.typicode.com/users/${userid}/posts`);
      return userPosts.json();
   }
   catch(err){
      return err;
   }

}

const getUser = async (userid) => {
   if(!userid) return;
   try{
      const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userid}`);
      return user.json();
   }
   catch(err){
      return err;
   }


}

const getPostComments = async (postid) => {
   if(!postid) return;
   try{
      const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`);
      return comments.json();
   }
   catch(err){
      return err;
   }

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