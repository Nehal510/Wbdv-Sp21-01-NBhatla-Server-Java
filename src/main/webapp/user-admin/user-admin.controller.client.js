/*
var users=[
    {
        Username:'Anduela24', Password:'Taba', FirstName:'Anduela', LastName:'Tabaku', Role:'Faculty'
    },
    {
        Username:'Jonida56', Password:'forall', FirstName:'Jonida', LastName:'Spuka', Role:'Student'
    } ,
    {
        Username:'Dan22', Password:'12345', FirstName:'Dan', LastName:'Wellington', Role:'Faculty'
    },
    {
        Username:'Liu56', Password:'batball', FirstName:'Liu', LastName:'Mullen', Role:'Student'
    }
];

var theTableBody=jQuery("tbody")
function createUser(user){
    users.push(user)
    renderUsers(users)
}
createUser({Username:'Sam68', Password:'movies', FirstName:'Sam', LastName:'Durant', Role:'Faculty'})
createUser({Username:'Tom56', Password:'florida', FirstName:'Tom', LastName:'Centineo', Role:'Faculty'})
createUser({Username:'Har77', Password:'tatb', FirstName:'Harry', LastName:'Kavinsky', Role:'Faculty'})
createUser({Username:'John11', Password:'movies', FirstName:'John', LastName:'Escobar', Role:'Student'})

function renderUsers(users) {
    theTableBody.empty()
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        theTableBody.append(
            `<tr>
                <td>${user.Username}</td>
                <td>${user.Password}</td>
                <td>${user.FirstName}</td>
                <td>${user.LastName}</td>
                <td>${user.Role}</td>
                <td><button class="wbdv-delete-btn" id=${i}><i class="fa fa-times"></i></button></td>
                <td><button><i class="fa fa-pencil"></i></button></td>      
        </tr>`
        )
    }
    jQuery("button.wbdv-delete-btn")
        .click(function(event){
            console.log(event.target)
            var deleteUserBtn = jQuery(event.target)
            var theClass = deleteUserBtn.attr("class")
            console.log(theClass)
            var theID = deleteUserBtn.attr("id")
            console.log(theID)
            users.splice(theID, 1)
            renderUsers(users)
        })
}
renderUsers(users)

var addUserBtn = jQuery("button.wbdv-add-btn")
function addUser(){
    createUser({Username:'Lara90', Password:'tatbpart3', FirstName:'Lara', LastName:'Jean', Role:'Student'})
}
addUserBtn.click(addUser)

var $usernameFld = $(".wbdv-username-fld")
var $passwordFld = $(".wbdv-password-fld")
var $fnameFld = $(".wbdv-fname-fld")
var $lnameFld = $(".wbdv-lname-fld")
var $roleFld = $(".wbdv-role-fld")
var $createBtn = $(".wbdv-create-btn")
*/

/*$createBtn.click(function(){
      var newUser = {
          Username:$usernameFld.val(),
          Password:$passwordFld.val(),
          FirstName:$fnameFld.val(),
          LastName:$lnameFld.val(),
          Role:$roleFld.val()
      }
      createUser(newUser)
})*/
/*
$createBtn.click(function(){
    createUser({
        Username:$usernameFld.val(),
        Password:$passwordFld.val(),
        FirstName:$fnameFld.val(),
        LastName:$lnameFld.val(),
        Role:$roleFld.val()
    })
        $usernameFld.val(""),
        $passwordFld.val(""),
        $fnameFld.val(""),
        $lnameFld.val(""),
        $roleFld.val("")
})
*/

/**********************************************************************************************************************/
var $usernameFld
var $passwordFld
var $fnameFld
var $lnameFld
var $roleFld
var $createBtn
/*var $addUserBtn*/
var $theTableBody
var $updateBtn
var userService=new AdminUserServiceClient()

function createUser(user){
    userService.createUser(user)
        .then(function(actualUser) {
            users.push(actualUser)
            renderUsers(users)
        })
}

var selectedUser=null
function selectUser(event){
    var selectUserBtn=jQuery(event.target)
    var theId=selectUserBtn.attr("id")
    selectedUser=users.find(user => user._id === theId)
    $usernameFld.val(selectedUser.Username)
    $passwordFld.val(selectedUser.Password)
    $fnameFld.val(selectedUser.FirstName)
    $lnameFld.val(selectedUser.LastName)
    $roleFld.val(selectedUser.Role)
}


function deleteUser(event){
    console.log(event.target)
    var deleteUserBtn = jQuery(event.target)
    var theClass = deleteUserBtn.attr("class")
    console.log(theClass)
    var theIndex = deleteUserBtn.attr("id")
    var theId = users[theIndex]._id
    console.log(theIndex)
    userService.deleteUser(theId)
        .then(function(status){
            users.splice(theIndex, 1)
            renderUsers(users)
        })
}

/*function addUser(){
    createUser({Username:'Lara90', Password:'tatbpart3', FirstName:'Lara', LastName:'Jean', Role:'Student'})
}*/

function renderUsers(users) {
    $theTableBody.empty()
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        $theTableBody.prepend(
            `<tr>
                <td>${user.Username}</td>
                <td class="hidepassword">${user.Password}</td>
                <td>${user.FirstName}</td>
                <td>${user.LastName}</td>
                <td>${user.Role}</td>
                <td>&nbsp;</td>
                <!--<td><button class="wbdv-delete-btn" id="${i}">Delete</button></td>
                <td><button class="wbdv-select-btn" id="${user._id}">Select</i></button></td>-->    
                <td><i class="fa-1x fa fa-times wbdv-delete-btn" id="${i}"></i></td> 
                <td><i class="fa-1x fa fa-pencil wbdv-select-btn" id="${user._id}"></i></td>              
        </tr>`
        )
    }
    jQuery(".wbdv-delete-btn").click(deleteUser)
    jQuery(".wbdv-select-btn").click(selectUser)
}

function updateUser(){
    selectedUser.Username=$usernameFld.val()
    selectedUser.Password=$passwordFld.val()
    selectedUser.FirstName=$fnameFld.val()
    selectedUser.LastName=$lnameFld.val()
    selectedUser.Role=$roleFld.val()
    userService.updateUser(selectedUser._id,selectedUser)
        .then(function(status) {
            var Index=users.findIndex(user => user._id === selectedUser._id)
            users[Index]=selectedUser
            renderUsers(users)
        })
        $usernameFld.val(""),
        $passwordFld.val(""),
        $fnameFld.val(""),
        $lnameFld.val(""),
        $roleFld.val("")
}

function main(){
    $usernameFld = $(".wbdv-username-fld")
    $passwordFld = $(".wbdv-password-fld")
    $fnameFld = $(".wbdv-fname-fld")
    $lnameFld = $(".wbdv-lname-fld")
    $roleFld = $(".wbdv-role-fld")
    $createBtn = $(".wbdv-create-btn")
    /*$addUserBtn = $(".wbdv-add-btn")
    $addUserBtn.click(addUser)*/
    $updateBtn=$(".wbdv-update-btn")
    $theTableBody=$("tbody")

    $updateBtn.click(updateUser)

    $createBtn.click(function(){
        createUser({
            Username:$usernameFld.val(),
            Password:$passwordFld.val(),
            FirstName:$fnameFld.val(),
            LastName:$lnameFld.val(),
            Role:$roleFld.val()
        })
            $usernameFld.val(""),
            $passwordFld.val(""),
            $fnameFld.val(""),
            $lnameFld.val(""),
            $roleFld.val("")
    })
    userService.findAllUsers()
        .then(function (actualUsersFromServer) {
            users=actualUsersFromServer
            renderUsers(users)
        })
}
jQuery(main)
