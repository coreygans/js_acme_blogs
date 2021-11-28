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
   return buttonToggle;
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