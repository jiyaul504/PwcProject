var actionBy = "";
var UserName = "";
var losCode = "";
var los = "";
var sbuCode = "";
var sbu = "";
var userCount = 0;
var removedUser = [];
var form = $('#__AjaxAntiForgeryForm');
var token = $('input[name="__RequestVerificationToken"]', form).val();

$(document).ready(function () {
    actionBy = $('#Action_By').val();
    UserName = $('#User_FullName').val();
    if ($('#User_Role').val() == "Admin") {
        $('#Los').attr('disabled', false);
        $('#sbu').attr('disabled', false);
        GetLos();
        GetSBU();
    }   
    else {
        los = $('#User_LOS').val();
        losCode = $('#User_LOS_Code').val();
        sbu = $('#User_SBU').val();
        sbuCode = $('#User_SBU_Code').val();
        $('#Los').val(los);
        $('#sbu').val(sbu);
        $('#Los').attr('disabled', true);
        $('#sbu').attr('disabled', true);
        GetUsers();
    }
    GetRoles();
});

function GetRoles() {
    $.ajax({
        url: '/User/GetRoles',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var html = '<option selected>Select Role</option>';
            $.each(result, function (key, item) {
                html += '<option value="' + item.role_ID + '">' + item.role_Description + '</option>';
            });
            $('#roleDrp_' + userCount + '').html(unescape(escape(html)));
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function GetLos() {
    var items = [];
    $.ajax({
        url: '/Request/GetLOS',
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

function GetUsers() {
    $('#user_Add_Section').show();
    var isSelected = false;
    var isAdded = false;
    if (selectedList != null) {
        isSelected = true;
    }
    $.ajax({
        url: '/User/GetUsers?losCode=' + losCode + '&sbuCode=' + sbuCode,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            $('#user_drop_' + userCount + '').html(unescape(escape(html)));
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    $("select.dynamic-option-create-createTag").select2({
       // tags: true,
        multiple: true,
        //createTag: (params) => {
        //    return {
        //        id: params.term.length,
        //        text: params.term,
        //    };
        //}
    });
}

function addUserFunction() {

    var res = true;

    if (res == true) {
        userCount += 1;

        $("#user_Add_Section:last").append(
            '<div id="userAddRow_' + userCount + '">' +
            '<div class="row m_auto p-3">' +
            '<span class="high_card">User 1</span>' +
            '<div class="col-md-10 bor_dash pt-5 pb-4">' +
            '<div class="row">' +
            '<div class="col-md-6 col-lg-6">' +
            '<div class="form-row m_auto">' +
            '<div class="form-group pwc_form col-md-12 p-0">' +
            '<label for="inputState" id="user_drop_Label_' + userCount + '">User</label>' +
            '<select id="user_drop_' + userCount + '" class="dynamic-option-create-createTag" style="width: 100%;" tabindex="4" placeholder="Choose a Users..." required>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-3">' +
            '<div class="form-group pwc_form col-md-12">' +
            '<label for="inputState" id="roleLabel_' + userCount + '">Role</label>' +
            '<select id="roleDrp_' + userCount + '" class="form-control pwc_dropdown_ctrl">' +
            '</select>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-1 text-center pt-5 pb-2" style="margin-top: 2%;">' +
            '<span class="icon-add_icon add_pwc_icon pointer add_icon whitetext-color addUser" id="addLink_0" aria-hidden="true" onclick="addUserFunction()"></span>' +
            '</div>' +
            '<div class="col-md-1 text-center pt-5 pb-2" style="margin-top: 2%;">' +
            '<span class="icon-delete_icon add_pwc_icon pointer delete_icon whitetext-color addUser" id="deleteLink_0" aria-hidden="true" onclick="deleteUserFunction(' + userCount + ')"></span>' +
            '</div>' +
            '</div>' +
            '</div>'
        );

        GetUsers();
        GetRoles();
    }
}

function deleteUserFunction(count) {
    removedUser.push(count);
    if (count != 0) {
        $('#userAddRow_' + count + '').remove();
    }
}

function AddUsers() {

}