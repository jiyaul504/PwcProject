var pageSize = 1;
var order = "";
var sort = "";
var previousSort = "";
var actionBy = "";
var isSuperAdmin = "";
var losCode = "";
var los = "";
var sbuCode = "";
var sbu = "";
var userEditID = "";
var userEditStatus = 0;
var userRoleID = "";
var los_Set_List = [];
var selectedUser = "";
var selectedUserId = "";

var los_list = [];
var los_Selection_List = [];
var selected_LOS_List = [];
var complete_LOS_List = [];
var losListCount = 0;
var selected_LOS_Code = "";
var selected_LOS_Name = "";

var sbu_list = [];
var sbu_Selection_List = [];
var selected_SBU_List = [];
var complete_SBU_List = [];
var sbuListCount = 0;
var selected_SBU_Code = "";
var selected_SBU_Name = "";
var form = $('#__AjaxAntiForgeryForm');
var token = $('input[name="__RequestVerificationToken"]', form).val();

$(document).ready(function () {
    actionBy = $('#Action_By').val();
    userRoleID = $('#User_Role_ID').val();

    isSuperAdmin = $('#IsSuperAdmin').val();
    loadData(1);
});

function loadData(page) {
    var limit = 10;

    var UserInput = {
        employee_Name: $('#search_employeeName').val(),
        employee_ID: $('#search_employeeId').val(),
        role: $('#search_role').val(),
        los: $('#search_los').val(),
        sbu: $('#search_sbu').val(),
        status: $('#search_status').val(),
        page: page,
        limit: limit,
        sort: sort,
        order: order,
    }

    var data = new FormData();
    data.append("UserInput", JSON.stringify(UserInput));
    data.append('__RequestVerificationToken', token);
    $.ajax({
        url: '/User/GetUsersList',
        data: data,
        type: "POST",
        contentType: false,
        processData: false,
        beforeSend: function () {
            // Show full page LoadingOverlay    
            $('#loaders').show();
        },
        success: function (result) {
            //$("#loading-image").hide();
            $('#loaders').hide();
            var html = '';
            var sNo = ((page - 1) * limit);
            var totalCount = result.totalCount

            $.each(result.users, function (key, item) {
                debugger
                sNo += 1;
                html += '<tr id=' + item.employee_ID + '>';
                html += '<th scope="row" class="fnt14">' + sNo + '</td>';
                html += '<td class="fnt14">' + item.employee_Name + '</td>';
                html += '<td class="fnt14">' + item.employee_ID + '</td>';
                html += '<td class="fnt14">' + item.role_Description + '</td>';

                var mapped_LOS = item.losCode.split(',');

                if (item.role_ID == 11) {
                    html += '<td class="fnt14" style="cursor:pointer"><div class="tooltips"><span class="red_cl">All</span></div></td>';

                    html += '<td class="fnt14" style="cursor:pointer"><div class="tooltips"><span class="red_cl">All</span></div></td>';
                }
                else if (item.role_ID == 12) {
                    html += '<td class="fnt14" style="cursor:pointer"><div class="tooltips"><span class="red_cl"> - </span></div></td>';

                    html += '<td class="fnt14" style="cursor:pointer"><div class="tooltips"><span class="red_cl"> - </span></div></td>';
                }
                else {
                    html += '<td class="fnt14" style="cursor:pointer"><div class="tooltips"><span class="red_cl">' + mapped_LOS.length + " " + 'LOS<ul class="tooltiptext">';

                    for (var i = 0; i < mapped_LOS.length; i++) {
                        html += "<li>" + mapped_LOS[i] + "</li>";
                    }
                    html += '</ul></span></div></td>';

                    var mapped_SBU = item.sbu.split(',');

                    html += '<td class="fnt14" style="cursor:pointer"><div class="tooltips"><span class="red_cl">' + mapped_SBU.length + " " + 'SBU<ul class="tooltiptext">';

                    for (var i = 0; i < mapped_SBU.length; i++) {
                        html += "<li>" + mapped_SBU[i] + "</li>";
                    }
                    html += '</ul></span></div></td>';
                }

                if (item.status_Key == "Active")
                    html += '<td class="fnt14"><div class="status-report" style="background-color: transparent">' + item.status_Key + '</td>';
                else if (item.status_Key == "In Active")
                    html += '<td class="fnt14"><div class="status-report" style="background-color: transparent">' + item.status_Key + '</td>';

                if (item.employee_ID == actionBy/* || (item.role_ID == 7 && userRoleID == "7")*/) {
                    html += '<td><div class="text-center">-</div></td>';
                }
                else {
                    html += '<td style="cursor:pointer" onclick="return getbyID(' + item.employee_ID + ')"><div class="text-center"><img src="img/edit.png"></div></td>';
                }

                if (item.name == actionBy/* || (item.role_ID == 7 && userRoleID == "7")*/) {
                    html += '<td><div class="text-center">-</div></td>';
                }
                else {
                    html += '<td style="cursor:pointer" onclick="return GetUsers(' + item.name + ')"><div class="text-center"><img src="img/view.png"></div></td>';
                }
                html += '</tr>';
            });
            if (totalCount == 0) {
                html += '<tr>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td style="color:red;">No Record(s) Found!</td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';

                html += '</tr>';
            }
            $('.tbody').html(html);
            if (totalCount != 0) {

                var pagination = '';

                pagination += '<ul class="pagination pagg_align">';
                pagination += '<li class="page-item"><a class="page-link" onclick=loadData(' + 1 + ') ><span style="font-weight:bold"> << </spa> </a></li>';

                if (page == 1) {
                    pagination += '<li class="page-item"><a class="page-link" disabled> Prev</a></li>';
                }
                else {
                    var pageNumber = page - 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick=loadData(' + pageNumber + ')> Prev</a></li>';
                }
                var lastPage = (Math.floor(totalCount / limit) + 1);
                if (Math.floor(totalCount % limit) != 0) {
                    lastPage = (Math.floor(totalCount / limit) + 1);
                }
                else {
                    lastPage = (Math.floor(totalCount / limit));
                }

                for (pageSize = (page - 1); (pageSize < (page + 4) && pageSize != lastPage); pageSize++) {
                    if (page == pageSize) {
                        pagination += '<li class="page-item"><a class="page-link active">' + pageSize + '</a></li >';
                    }
                    else if (pageSize != 0) {
                        pagination += '<li class="page-item"><a class="page-link" onclick = loadData(' + pageSize + ')>' + pageSize + '</a></li >';
                    }
                }
                if (page == lastPage) {
                    pagination += '<li class="page-item"><a class="page-link active">' + lastPage + '</a></li >';
                }
                else {
                    if (lastPage - page >= 5) {
                        pagination += '<li class="page-item"><a class="page-link">....</a></li >';
                    }
                    pagination += '<li class="page-item"><a class="page-link" onclick =  loadData(' + lastPage + ')>' + lastPage + '</a></li >';
                }
                if (page == lastPage) {
                    pagination += '<li class="page-item"><a class="page-link" disabled>Next </a></li >';
                }
                else {
                    var pageNumber = page + 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick=loadData(' + pageNumber + ')>Next </a></li >';
                }
                pagination += '<li class="page-item"><a class="page-link" onclick=loadData(' + lastPage + ') ><span style="font-weight:bold"> >> </spa> </a></li>';

                pagination += '</ul>';
                $('.pagination_page').html(pagination);
            }
            else {
                $('.pagination_page').html('');
            }

        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function Search() {
    loadData(1);
}

function sortTable(sortData) {
    if (order == "ASC" && previousSort == sortData) {
        order = "DESC"
    }
    else {
        order = "ASC"
    }
    sort = sortData;
    previousSort = sort;
    loadData(1);
}

function AddUser() {
 
    $('#add_Title').show();
    $('#update_Title').hide();
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $('#user_Edit_Section').hide();
    $('#user_Status_Section').hide();
    $('#user_Add_Section').show();
    $('#multiple_LOS_SBU_Selection').show();
    $('#multiple_LOS_SBU_Info').hide();
    //if ($('#User_Role').val() == "SuperAdmin") {
    //    $('#Los').attr('disabled', false);
    //    $('#sbu').attr('disabled', false);
    //    $('#Los').val("");
    //    $('#sbu').val("");
    //    //GetLos();
    //    //GetSBU();
    //}
    //else {
    //    los = $('#User_LOS').val();
    //    losCode = $('#User_LOS_Code').val();
    //    sbu = $('#User_SBU').val();
    //    sbuCode = $('#User_SBU_Code').val();
    //    $('#Los').val(los);
    //    $('#sbu').val(sbu);
    //    $('#Los').attr('disabled', true);
    //    $('#sbu').attr('disabled', true);
    //}

    $('#user_drop').css('border-color', 'lightgrey');
    $('#user_drop_Label').css('color', 'Black');

    $('#roleDrp').css('border-color', 'lightgrey');
    $('#roleLabel').css('color', 'Black');

    $('#multiple_LOS_Label').css('color', 'Black');

    $('#multiple_SBU_Label').css('color', 'Black');

    los_Selection_List = [];
    sbu_Selection_List = [];
    selected_LOS_Code = "";
    selected_SBU_Code = "";
    GetLOSMultiple();
    GetUsers();
    GetSBUMultiple();
    GetRoles("");
}

function GetRoles(roleID, role_Description) {

    $.ajax({
        url: '/User/GetRoles',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var html = '<option value= "" selected>Select Role</option>';
            $('#roleDrp').val("").attr("disabled", false);
            if (userRoleID == 7 && roleID == 7) {
                html += '<option value="' + roleID + '" selected>' + role_Description + '</option>';
            }
            $.each(result, function (key, item) {
                if (isSuperAdmin == "Yes" && roleID != 7 && roleID != 11 && roleID != 12 && roleID != "") {
                    html += '<option value="' + roleID + '" selected>' + role_Description + '</option>';
                    $('#roleDrp').val(roleID).attr("disabled", true);
                }

                else if (item.role_ID == roleID) {
                    html += '<option value="' + item.role_ID + '" selected>' + item.role_Description + '</option>';
                    $('#roleDrp').val(roleID).attr("disabled", false);
                }
                else {
                    html += '<option value="' + item.role_ID + '">' + item.role_Description + '</option>';
                    $('#roleDrp').val(roleID).attr("disabled", false);
                }
            });
            $('#roleDrp').html(unescape(escape(html)));
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function GetLos() {
    alert("testing");
    var items = [];
    alert("Test");
    $.ajax({
        url: '/User/GetLOS',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                items[key] = item.loS_Name;
            });
            $('#Los').autocomplete({
                source: items,
                select: function (event, ui) {
                    var value = ui.item.value;
                    var id = '';
                    for (var i = 0; i < result.length; i++) {
                        if (value == result[i].loS_Name) {
                            id = result[i].loS_Code;
                            los = result[i].loS_Name;
                            losCode = result[i].loS_Code;
                            break;
                        }
                    }
                    GetSBU(id);
                }
            }
            );
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function GetSBU(id) {
    var items = [];
    $.ajax({
        url: '/Request/GetSBU?losCode=' + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                items[key] = item.sbU_Name;

            });
            $('#sbu').autocomplete({
                source: items,
                select: function (event, ui) {
                    var value = ui.item.value;
                    var id = '';
                    for (var i = 0; i < result.length; i++) {
                        if (value == result[i].sbU_Name) {
                            id = result[i].sbU_Code;
                            sbu = result[i].sbU_Name;
                            sbuCode = result[i].sbU_Code;
                            break;
                        }
                    }
                    GetUsers();
                }
            }
            );
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

//function GetUsers() {
//    $('#user_drop').val("");
//    $('#user_Add_Section').show();
//    $.ajax({
//        url: '/User/GetUsers?losCode=' + losCode + '&sbuCode=' + sbuCode,
//        type: "GET",
//        contentType: "application/json;charset=UTF-8",
//        dataType: "json",
//        beforeSend: function () {
//            $('#loaders').show();
//        },
//        success: function (result) {
//            $('#loaders').hide();
//            var html = '';
//            $.each(result, function (key, item) {
//                html += '<option value="' + item.id + '">' + item.name + '</option>';
//            });
//            $('#user_drop').html(html);
//        },
//        error: function (errormessQunatity) {
//            alert(errormessQunatity.responseText);
//        }
//    });
//    $("select.dynamic-option-create-createTag").select2({
//        tags: true,
//        multiple: true,
//        createTag: (params) => {
//            return {
//                id: params.term.length,
//                text: params.term,
//            };
//        }
//    });
//}

function GetUsers() {
    $('#user_drop').val("");
    $('#user_Add_Section').show();
    var items = [];
    $.ajax({
        url: '/User/GetAllUsers?UserId=' + actionBy + '&UserRoleId=' + userRoleID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        beforeSend: function () {
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();
            los_Set_List = result.losList;
            $.each(result.userList, function (key, item) {
                items[key] = item.name;
            });
            $('#user_drop').autocomplete({
                source: items,
                minLength: 3,
                select: function (event, ui) {
                    var value = ui.item.value;
                    var id = '';
                    for (var i = 0; i < result.userList.length; i++) {
                        if (value == result.userList[i].name) {
                            id = result.userList[i].id;
                            $('#user_drop').val(result.userList[i].name);
                            selectedUser = result.userList[i].fullName;
                            selectedUserId = result.userList[i].id;
                            break;
                        }
                    }
                }
            }
            );
            GetLOSMultiple();
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function Add() {

    var res = validate("Add");

    if (res == true) {
        var user = [];
        //var userData = [];
        //userData = $('#user_drop').val();
        //for (var i = 0; i < userData.length; i++) {
        var userJson = {
            Employee_ID: selectedUserId,
            Employee_Name: selectedUser,
            Role_ID: $('#roleDrp').val(),
            LOSCode: selected_LOS_Code,
            LOS: selected_LOS_Name,
            SBU_Code: selected_SBU_Code,
            SBU: selected_SBU_Name,
            Status_ID: 1,
            IS_SuperAdmin: 0,
            Action_By: actionBy
        }
        user.push(userJson);
        //}

        var data = new FormData();
        data.append('users', JSON.stringify(user));
        data.append('losCode', selected_LOS_Code);
        data.append('sbuCode', selected_SBU_Code);
        data.append('__RequestVerificationToken', token);
        $.ajax({
            url: '/User/AddUser',
            data: data,
            type: "POST",
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('#loaders').show();  
            },
            success: function (result) {
                $('#loaders').hide();
                $('#add_User').modal('hide');
                $('.modal-backdrop').remove();
                $('#add_success').modal('show');
                $('#success_msg').html(unescape(escape("User has been Successfully Added!!")));
               
                loadData(1);
                
            },
            error: function (errormessQunatity) {
                alert(errormessQunatity.responseText);
            }
        });
    }
}

function validate(title) {
    var isValid = true;

    if (title != "Edit") {
        if (!document.getElementById('user_drop').validity.valid) {
            $('#user_drop').css('border-color', 'Red');
            $('#user_drop_Label').css('color', 'Red');
            isValid = false;
        }
        else {
            $('#user_drop').css('border-color', 'lightgrey');
            $('#user_drop_Label').css('color', 'Black');
        }
    }

    if (!document.getElementById('roleDrp').validity.valid) {
        $('#roleDrp').css('border-color', 'Red');
        $('#roleLabel').css('color', 'Red');
        isValid = false;
    }
    else {
        $('#roleDrp').css('border-color', 'lightgrey');
        $('#roleLabel').css('color', 'Black');
    }


    if ($('#roleDrp').val() != 11 && $('#roleDrp').val() != 12) {
        if (selected_LOS_Code != "" && selected_LOS_Code != null) {
            $('#multiple_LOS_Label').css('color', 'Black');
        }
        else {
            $('#multiple_LOS_Label').css('color', 'Red');
            isValid = false;
        }
        if (selected_SBU_Code != "" && selected_SBU_Code != null) {
            $('#multiple_SBU_Label').css('color', 'Black');
        }
        else {
            $('#multiple_SBU_Label').css('color', 'Red');
            isValid = false;
        }
    }

    return isValid;
}

function getbyID(ID) {
    userEditID = ID;
    $.ajax({
        url: '/User/GetUserByID?userID=' + ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#add_User').modal('show');
            $('#add_Title').hide();
            $('#update_Title').show();
            $('#btnAdd').hide();
            $('#btnUpdate').show();
            $('#user_Add_Section').hide();
            $('#user_Edit_Section').show();
            $('#user_Status_Section').show();
            $('#EditUser_Name').val(result.employee_Name);
            $('#EditUser_Role').val(result.role_Description);
            GetRoles(result.role_ID, result.role_Description);

            $('#user_drop').css('border-color', 'lightgrey');
            $('#user_drop_Label').css('color', 'Black');

            $('#roleDrp').css('border-color', 'lightgrey');
            $('#roleLabel').css('color', 'Black');

            $('#multiple_LOS_Label').css('color', 'Black');

            $('#multiple_SBU_Label').css('color', 'Black');

            if (result.status_ID == 1) {
                $('#customRadio1').prop('checked', true);
            }
            else {
                $('#customRadio2').prop('checked', true);
            }

            userEditStatus = result.status_ID;
            $('#Los').val(result.los);
            $('#sbu').val(result.sbu);
            $('#Los').attr('disabled', true);
            $('#sbu').attr('disabled', true);

            if (result.role_ID == 11) {
                $('#multiple_LOS_SBU_Selection').hide();
                $('#multiple_LOS_SBU_Info').show();
                GetLosList();
                GetSBUMultiple();
            }
            else if (result.role_ID == 12) {
                $('#multiple_LOS_SBU_Selection').hide();
                $('#multiple_LOS_SBU_Info').hide();
                GetLosList();
                GetSBUMultiple();
            }
            else {
                if (result.role_ID != 7 && userRoleID == 11) {
                    $('#multiple_LOS_SBU_Selection').hide();
                    $('#multiple_LOS_SBU_Info').hide();
                    los_Selection_List = result.loS_Code_List;
                    sbu_Selection_List = result.sbU_Code_List;
                    selected_LOS_Code = result.loS_Code_List.join(',');
                    selected_SBU_Code = result.sbU_Code_List.join(',');
                }
                else {
                    $('#multiple_LOS_SBU_Selection').show();
                    $('#multiple_LOS_SBU_Info').hide();
                    los_Selection_List = result.loS_Code_List;
                    sbu_Selection_List = result.sbU_Code_List;
                    selected_LOS_Code = result.loS_Code_List.join(',');
                    selected_SBU_Code = result.sbU_Code_List.join(',');
                    GetLosList();
                    GetSBUMultiple();
                }
            }
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function Update() {
    var res = validate("Edit");
    var statusId = 0;

    if ($('#customRadio2').is(':checked')) {
        statusId = 0;
    }
    else {
        statusId = 1;
    }

    //if (statusId != userEditStatus) {
    //    res = true;
    //}

    if (res == true) {
        var data = new FormData();
        data.append('losCode', selected_LOS_Code);
        data.append('sbuCode', selected_SBU_Code);
        data.append('__RequestVerificationToken', token);
        $.ajax({
            url: '/User/UpdateUser?userID=' + userEditID + '&actionBy=' + actionBy + '&statusID=' + statusId + '&roleID=' + $('#roleDrp').val(),
            data: data,
            type: "POST",
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('#loaders').show();
            },
            success: function (result) {
                $('#loaders').hide();
                $('#add_User').modal('hide');
                $('#add_success').modal('show');
                $('#success_msg').html(unescape(escape("User has been Successfully Updated!!")));
                loadData(1);
            },
            error: function (errormessQunatity) {
                alert(errormessQunatity.responseText);
            }
        });
    }
}

function GetLosList() {
    $.ajax({
        url: '/User/GetLOS',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            los_Set_List = result;
            GetLOSMultiple();
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function GetLOSMultiple() {

    //alert("fired los method")
    //$.ajax({
    //    url: '/User/GetLOS',
    //    type: "GET",
    //    contentType: "application/json;charset=UTF-8",
    //    dataType: "json",
    //    beforeSend: function () {
    //        $('#loaders_1').show();
    //    },
    //success: function (result) {
    $('#loaders_1').hide();
    var html = '';
    var dropdown = '';
    var selectedCount = 0;
    los_list = [];
    selected_LOS_List = [];
    complete_LOS_List = [];
    losListCount = los_Set_List.length;
   

    $.each(los_Set_List, function (key, item) {
        complete_LOS_List.push(item.loS_Code);
        var flag = false
        for (var i = 0; i < los_Selection_List.length; i++) {
            if (item.loS_Code == los_Selection_List[i]) {
                flag = true;
                break;
            }
            if (flag == true) {
                break;
            }
        }
        if (flag == true) {
            dropdown += '<label class="custom_container"><input type="checkbox" class = "checkbox" id="' + item.loS_Code + '" value="' + item.loS_Code + '" onclick="AddList(' + item.loS_Code + ')" checked/>' + item.loS_Name + '<span class="custom_checkmark"></span></label>';
            los_list.push(item.loS_Code);
            selectedCount += 1;
        }
        else {
            dropdown += '<label class="custom_container"><input type="checkbox" class = "checkbox" id="' + item.loS_Code + '" value="' + item.loS_Code + '" onclick="AddList(' + item.loS_Code + ')"/>' + item.loS_Name + '<span class="custom_checkmark"></span></label>';
        }
    });

    if (selectedCount == 0) {
        html += '<span class="anchor" id="selectLOSCount">Select LOS</span>';
    }
    else {
        html += '<span class="anchor" id="selectLOSCount">' + selectedCount + ' LOS Selected</span>';
    }
    html += '<ul class="items">';
    if (los_Set_List.length == selectedCount) {
        html += '<label class="custom_container"><input type="checkbox" id = "select_all" checked /> Select All<span class="custom_checkmark"></span></label>';
    }
    else {
        html += '<label class="custom_container"><input type="checkbox" id = "select_all"/> Select All<span class="custom_checkmark"></span></label>';
    }
    html += dropdown;
    html += '</ul>';

    $('#list1').html(unescape(escape(html)));

    var checkList = document.getElementById('list1');
    checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
        if (checkList.classList.contains('visible'))
            checkList.classList.remove('visible');
        else
            checkList.classList.add('visible');
    }

    $('#select_all').on('click', function () {
        if (this.checked) {
            los_list = [];
            $('.checkbox').each(function () {
                this.checked = true;
                los_list.push(parseInt($(this).val()));
            });
            $('#selectLOSCount').html(unescape(escape("All")));
            selected_LOS_Code = los_list.join(',');
            sbu_Selection_List = sbu_list;
            GetSBUMultiple();
        } else {
            $('.checkbox').each(function () {
                this.checked = false;
                los_list = [];
            });
            $('#selectLOSCount').html(unescape(escape("Select LOS")));
            selected_LOS_Code = "";
            sbu_Selection_List = sbu_list;
            GetSBUMultiple();
        }
    });

    $('.checkbox').on('click', function () {
        if ($('.checkbox:checked').length == $('.checkbox').length) {
            $('#select_all').prop('checked', true);
        } else {
            $('#select_all').prop('checked', false);
        }
    });
    selected_LOS_List = los_list;
    //},
    //error: function (errormessQunatity) {
    //    alert(errormessQunatity.responseText);
    //}
    //});
    return false;
}

function AddList(Id) {
    if ($('#' + Id).is(':checked')) {
        los_list.push(Id);
    }
    else {
        los_list = $.grep(los_list, function (value) {
            return value != Id;
        });
    }
    if (los_list.length == losListCount) {
        $('#selectLOSCount').html(unescape(escape("All")));
    }
    else if (los_list.length == 0) {
        $('#selectLOSCount').html(unescape(escape("Select LOS")));
    }
    else {
        $('#selectLOSCount').html(unescape(escape(los_list.length + " - LOS Selected")));
    }

    selected_LOS_Code = los_list.join(',');
    sbu_Selection_List = sbu_list;
    GetSBUMultiple();
}

function GetSBUMultiple() {
    $.ajax({
        url: '/User/GetSBU?losCode=' + selected_LOS_Code,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        beforeSend: function () {
            $('#loaders_2').show();
        },
        success: function (result) {
            $('#loaders_2').hide();
            var html = '';
            var dropdown = '';
            var selectedCount = 0;
            sbu_list = [];
            selected_SBU_List = [];
            complete_SBU_List = [];
            sbuListCount = result.length;
            currentLOS = "";
            previousLOS = "";
            los_Checked_List = [];
            LOSShown = false;
            var losCount = 0;
            var sbuMappingCount = 0;

            $.each(result, function (key, item) {
                complete_SBU_List.push(item.sbU_Code);
                if (currentLOS != item.loS_Name) {
                    previousLOS = currentLOS;
                    currentLOS = item.loS_Name;
                    LOSShown = true;
                }
                else {
                    LOSShown = false;
                }
                var flag = false
                for (var i = 0; i < sbu_Selection_List.length; i++) {
                    if (item.sbU_Code == sbu_Selection_List[i]) {
                        flag = true;
                        break;
                    }
                    if (flag == true) {
                        break;
                    }
                }
                var currentlosName = "'".concat(item.loS_Name);
                var losName = currentlosName.concat("'");
                if (LOSShown) {
                    if (losCount == sbuMappingCount && sbuMappingCount != 0) {
                        los_Checked_List.push(previousLOS);
                    }
                    losCount = +1;
                    sbuMappingCount = 0;
                    dropdown += '<label class="custom_container"><input type="checkbox" class = "checkbox losCheckBox ' + item.loS_Code + '" id="' + item.loS_Name + '" value="' + item.loS_Code + '" onclick="AddSBUGroupList(' + losName + ')"/>' + currentLOS + '<span class="custom_checkmark"></span></label>';
                }
                else {
                    losCount += 1;
                }
                if (flag == true) {
                    dropdown += '<label class="custom_container">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" class = "checkbox sbuCheckBox losBasedCheckBox ' + item.loS_Name + '" id="' + item.sbU_Code + '" value="' + item.sbU_Code + '" onclick="AddSBUList(' + item.sbU_Code + ',' + item.loS_Code + ')" checked/>' + item.sbU_Name + '<span class="custom_checkmark" style="margin-left:20px"></span></label>';
                    sbu_list.push(item.sbU_Code);
                    selectedCount += 1;
                    sbuMappingCount += 1;
                }
                else {
                    dropdown += '<label class="custom_container">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" class = "checkbox sbuCheckBox losBasedCheckBox ' + item.loS_Name + '" id="' + item.sbU_Code + '" value="' + item.sbU_Code + '" onclick="AddSBUList(' + item.sbU_Code + ',' + item.loS_Code + ')"/>' + item.sbU_Name + '<span class="custom_checkmark" style="margin-left:20px"></span></label>';
                }
            });

            if (selectedCount == 0) {
                html += '<span class="anchor" id="selectSBUCount">Select SBU</span>';
            }
            else {
                html += '<span class="anchor" id="selectSBUCount">' + selectedCount + ' - SBU Selected</span>';
            }
            html += '<ul class="items" style="height: 170px; overflow-y: scroll;">';
            if (result.length == selectedCount) {
                html += '<label class="custom_container"><input type="checkbox" id = "select_all_sbu" checked /> Select All<span class="custom_checkmark"></span></label>';
            }
            else {
                html += '<label class="custom_container"><input type="checkbox" id = "select_all_sbu"/> Select All<span class="custom_checkmark"></span></label>';
            }
            html += dropdown;
            html += '</ul>';

            $('#list2').html(unescape(escape(html)));

            for (var i = 0; i < los_Checked_List.length; i++) {
                //$('#' + los_Checked_List[i]).prop(unescape(escape('Checked', true)));
            }

            var checkList = document.getElementById('list2');
            checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
                if (checkList.classList.contains('visible'))
                    checkList.classList.remove('visible');
                else
                    checkList.classList.add('visible');
            }

            $('#select_all_sbu').on('click', function () {
                if (this.checked) {
                    sbu_list = [];
                    $('.sbuCheckBox').each(function () {
                        this.checked = true;
                        sbu_list.push(parseInt($(this).val()));
                    });
                    $('.losCheckBox').each(function () {
                        this.checked = true;
                    });
                    $('#selectSBUCount').html(unescape(escape("All")));
                    selected_SBU_Code = sbu_list.join(',');
                } else {
                    $('.sbuCheckBox').each(function () {
                        this.checked = false;
                        sbu_list = [];
                    });
                    $('.losCheckBox').each(function () {
                        this.checked = false;
                    });
                    $('#selectSBUCount').html(unescape(escape("Select SBU")));
                    selected_SBU_Code = sbu_list.join(',');
                }
            });

            $('.sbuCheckBox').on('click', function () {
                if ($('.sbuCheckBox:checked').length == $('.sbuCheckBox').length) {
                    $('#select_all_sbu').prop('checked', true);
                } else {
                    $('#select_all_sbu').prop('checked', false);
                }
            });
            $('.losCheckBox').on('click', function () {
                if ($('.losCheckBox:checked').length == $('.losCheckBox').length) {
                    $('#select_all_sbu').prop('checked', true);
                } else {
                    $('#select_all_sbu').prop('checked', false);
                }
            });
            selected_SBU_List = sbu_list;
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function AddSBUList(Id, losID) {
    if ($('#' + Id).is(':checked')) {
        sbu_list.push(Id);
    }
    else {
        $('.' + losID).prop('checked', false);
        sbu_list = $.grep(sbu_list, function (value) {
            return value != Id;
        });
    }

    if (sbu_list.length == sbuListCount) {
        $('#selectSBUCount').html(unescape(escape("All")));
    }
    else if (sbu_list.length == 0) {
        $('#selectSBUCount').html(unescape(escape("Select SBU")));
    }
    else {
        $('#selectSBUCount').html(unescape(escape(sbu_list.length + " - SBU Selected")));
    }

    selected_SBU_Code = sbu_list.join(',');
}

function AddSBUGroupList(Id) {
    if ($('#' + Id).is(':checked')) {
        $('.' + Id).each(function () {
            if (!$(this).is(':checked')) {
                this.checked = true;
                sbu_list.push(parseInt($(this).val()));
            }
        });
    }
    else {
        $('.' + Id).prop('checked', false);
        var values = document.getElementsByClassName('' + Id + '');
        for (var i = 0; i < values.length; i++) {
            var idValue = values[i].id;
            sbu_list = $.grep(sbu_list, function (value) {
                return value != idValue;
            });
        }
    }

    if (sbu_list.length == sbuListCount) {
        $('#selectSBUCount').html(unescape(escape("All")));
    }
    else if (sbu_list.length == 0) {
        $('#selectSBUCount').html(unescape(escape("Select SBU")));
    }
    else {
        $('#selectSBUCount').html(unescape(escape(sbu_list.length + " - SBU Selected")));
    }

    selected_SBU_Code = sbu_list.join(',');
}

function MappingFunction() {
    if ($('#roleDrp').val() == 11) {
        $('#multiple_LOS_SBU_Selection').hide();
        $('#multiple_LOS_SBU_Info').show();
    }
    else if ($('#roleDrp').val() == 12) {
        $('#multiple_LOS_SBU_Selection').hide();
        $('#multiple_LOS_SBU_Info').hide();
    }
    else {
        $('#multiple_LOS_SBU_Selection').show();
        $('#multiple_LOS_SBU_Info').hide();
    }
}