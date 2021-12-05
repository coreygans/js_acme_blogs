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
      const button = buttonSelect[i];
      const postId = button.dataset.postId;
      button.addEventListener("click", function (e) {toggleComments(e, postId)}, false);
   }

   return buttonSelect;
}


const removeButtonListeners = () => {
   const buttonSelect =  document.querySelectorAll('main button');
   if(!buttonSelect) return;
   for(let i = 0; i < buttonSelect?.length; i++){
      const button = buttonSelect[i];
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
   selectMenu.append(createOptions[i]);
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

const displayComments = async (postId) => {
   if(!postId) return;
   const section = document.createElement('section');
   section.dataset.postId = postId;
   section.classList.add('comments','hide');
   const comments = await getPostComments(postId);
   const fragment = createComments(comments);
   section.append(fragment);
   return section;
}

const createPosts = async (posts) => {
   if(!posts) return;
   const fragment = document.createDocumentFragment();

   for(let i = 0; i < posts.length; i++){
      const article = document.createElement('article');
      const h2 = createElemWithText('h2', posts[i].title);
      const body = createElemWithText('p', posts[i].body);
      const postIdentifier = createElemWithText('p', `Post ID: ${posts[i].id}`);
      const author = await getUser(posts[i].userId);
      const authorInfo =  createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
      const catchPhrase = createElemWithText('p', author.company.catchphrase);
      const showCommentsButton = createElemWithText('button', 'Show Comments');
      showCommentsButton.dataset.postId = posts[i].id;
      article.append(h2);
      article.append(body);
      article.append(postIdentifier);   
      article.append(authorInfo);   
      article.append(catchPhrase);   
      article.append(showCommentsButton);   
      const section = await displayComments(posts[i].id); 
      article.append(section);
      fragment.append(article);
   }

   return fragment;
}

const displayPosts = async (posts) => {
   if(!posts) return;
   const mainElement = document.querySelector('main');
   const element = await (posts) ? await createPosts(posts): createElemWithText('p','Select an Employee to display their posts.');
   mainElement.append(element);
   return element;
}

const toggleComments = (event, postId) => {
   if(!event || !postId) return;
   event.target.listener = true;
   const section = toggleCommentSection(postId);
   const button = toggleCommentButton(postId);

   return [section, button];

}

const refreshPosts = async (posts) => {
   if(!posts) return;
 const removeButtons = removeButtonListeners();
 const dce = deleteChildElements('main');
 const dPosts = await displayPosts(posts); 
 const addButtons = addButtonListeners(); 

 return [removeButtons, dce, dPosts, addButtons];

}

const selectMenuChangeEventHandler = async (e) => {
const userId = e?.target?.value || 1;
const posts = await getUserPosts(userId);
const refreshPostsArray = await refreshPosts(posts);
return [userId, posts, refreshPostsArray];
}

const initPage = async () => {
   const users =  await getUsers();
   const selectE = populateSelectMenu(users);
   return [users, selectE];

}

const initApp = () => {
initPage();
const selectMenu = document.getElementById('selectMenu');
selectMenu.addEventListener('change', selectMenuChangeEventHandler());

}

document.addEventListener('DOMContentLoaded', initApp())