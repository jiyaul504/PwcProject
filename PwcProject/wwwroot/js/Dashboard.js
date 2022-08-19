var pageSize = 1;
var Order = "";
var sort = "";
var previousSort = "";
var actionBy = "";
var StatusName = "";
var StatusID = 0;
var IsLegal = 0;
var currentTitle = "";
var teamType = 0;
var tabType = 0;
var userRoleID = "";
var designationID = "";
var UserName = "";
var UserRole = "";
var losCode = "";
var los = "";
var sbuCode = "";
var sbu = "";
var selectedVendor = [];
var IsGovernmentClientFilter = 0;
var currentWidgetType = 0;
var selectedLos = "";
var selectedSbu = "";
var selectedLosName = "";
var selectedSbuName = "";
var requestTotalCount = 0;
var requestList = [];
var teamRequestTotalCount = 0;
var teamRequestList = [];
var form = $('#__AjaxAntiForgeryForm');
var token = $('input[name="__RequestVerificationToken"]', form).val();

$(document).ready(function () {

    actionBy = $('#Action_By').val();
    UserName = $('#User_FullName').val();
    userRoleID = $('#User_Role_ID').val();
    designationID = $('#Designation_ID').val();
    userRole = $('#User_Role').val();
    los = $('#User_LOS').val();
    losCode = $('#User_LOS_Code').val();
    sbu = $('#User_SBU').val();
    sbuCode = $('#User_SBU_Code').val();

    if (userRoleID == "2") {
        $('#tabContent').show();
        $('#Manager_Request_Switch_Tab').show();
        getTeamsProgressBar(1);
    }
    else if (userRoleID == "4" || userRoleID == "10") {
        $('#tabContent').show();
        $('#File_Coordinator_Request_Switch_Tab').show();
        GetVendors();
        if (designationID == "2") {
            tabType = 1;
            getTeamsProgressBar(1);
        }
        else {
            tabType = 2;
            getTeamsProgressBar(2);
        }

        $("#vendor_drop").change(function () {
            selectedVendor = $('#vendor_drop').val();
            getTeamsProgressBar(2);
        });
    }
    else if (userRoleID == "8" || userRoleID == "9" || userRoleID == "6") {
        if (designationID == "2") {
            $('#tabContent').show();
            $('#RM_OGC__Request_Switch_Tab').show();
            tabType = 1;
            getTeamsProgressBar(1);
        }
        else if (designationID == "3") {
            $('#tabContent').show();
            $('#RM_OGC__Request_Switch_Tab').show();
            var element = document.getElementById("teamrequest");
            element.classList.remove("active");
            var element = document.getElementById("myrequest");
            element.classList.remove("fade");
            var element = document.getElementById("myrequest");
            element.classList.add("in");
            var element = document.getElementById("myrequest");
            element.classList.add("active");
            loadData(2);
            currentWidgetType = 2;
        }
        else {
            $('#tabContent').show();
            var element = document.getElementById("teamrequest");
            element.classList.remove("active");
            var element = document.getElementById("myrequest");
            element.classList.remove("fade");
            var element = document.getElementById("myrequest");
            element.classList.add("in");
            var element = document.getElementById("myrequest");
            element.classList.add("active");
            if (userRoleID == "6") {
                loadData(1);
            }
            else {
                loadData(2);
            }
        }
    }
    else if (userRoleID == "1") {
        $('#tabContent').show();
        var element = document.getElementById("teamrequest");
        element.classList.remove("active");
        var element = document.getElementById("myrequest");
        element.classList.remove("fade");
        var element = document.getElementById("myrequest");
        element.classList.add("in");
        var element = document.getElementById("myrequest");
        element.classList.add("active");
        loadData(1);
    }
    else if (userRole == "Partner") {
        $('#tabContent').show();
        var element = document.getElementById("teamrequest");
        element.classList.remove("active");
        var element = document.getElementById("myrequest");
        element.classList.remove("fade");
        var element = document.getElementById("myrequest");
        element.classList.add("in");
        var element = document.getElementById("myrequest");
        element.classList.add("active");
        loadData(2);
    }
    else if (userRole == "SuperAdmin") {
        currentWidgetType = 1;
        GetLos();
        GetRequestsAnalytics("", "");
        //loadChart(1, 1);
        //GetHistoricalDataCount();
        $('#tabContent').show();
        $('#14').show();
        $('#historicalDataProgressBar').show();
        $('#my_Request_Widget').hide();
        var element = document.getElementById("teamrequest");
        element.classList.remove("active");
        var element = document.getElementById("myrequest");
        element.classList.remove("fade");
        var element = document.getElementById("myrequest");
        element.classList.add("in");
        var element = document.getElementById("myrequest");
        element.classList.add("active");
    }
    else if (userRole == "Admin") {
        currentWidgetType = 1;
        GetRequestsAnalytics(losCode, sbuCode);
        //loadChart(1, 1);
        $('#tabContent').show();
        $('#12').hide();
        $('#11').hide();
        $('#13').show();
        $('#my_Request_Widget').hide();
        var element = document.getElementById("teamrequest");
        element.classList.remove("active");
        var element = document.getElementById("myrequest");
        element.classList.remove("fade");
        var element = document.getElementById("myrequest");
        element.classList.add("in");
        var element = document.getElementById("myrequest");
        element.classList.add("active");
    }
    else if (userRoleID == "12") {
        currentWidgetType = 1;
        $('#userProgressBar').show();
        GetHistoricalDataCount();
        $('#historical-pills-tabContent').show();
        $('#12').hide();
        $('#11').hide();
        $('#13').show();
        $('#13_heading').html('Historical Data Analysis ');
        $('#my_Request_Widget').hide();
        var element = document.getElementById("historical-pills-home");
        element.classList.remove("active");
        var element = document.getElementById("historical-pills-home");
        element.classList.remove("show");
        var element = document.getElementById("historical-pills-profile");
        element.classList.remove("fade");
        var element = document.getElementById("historical-pills-profile");
        element.classList.add("in");
        var element = document.getElementById("historical-pills-profile");
        element.classList.add("active");
        $('#historicalTableData').show();
        loadHistoricalChart(1, 1);
    }

});

function RedirectToUser(role, title) {
    if (userRole == "SuperAdmin") {
        window.location.href = unescape(escape('/User?status=Active&role= ' + role + '&los=' + selectedLosName + '&sbu=' + selectedSbuName + '&isFromDashboard=true&title=' + title + ''));
    }
    else {
        window.location.href = unescape(escape('/User?status=Active&role= ' + role + '&isFromDashboard=true&title=' + title + ''));
    }
}

function RedirectToRequests(ID) {
    if (userRole == "SuperAdmin") {
        window.location.href = unescape(escape('/Request/RequestsPartialView?Pagetype=4&statusID=' + ID + '&isFromDashboard=true&los=' + selectedLos + '&sbu=' + selectedSbu));
    }
    else {
        window.location.href = unescape(escape('/Request/RequestsPartialView?Pagetype=4&statusID=' + ID + '&isFromDashboard=true'));
    }
}


function RedirectToHistoricalData(status, title) {
    window.location.href = unescape(escape('/Historical?Pagetype=9&status=' + status + '&los=' + selectedLosName + '&sbu=' + selectedSbuName + '&isFromDashboard=true&title=' + title + ''));
}

function GetHistoricalDataCount() {
    $.ajax({
        url: '/Dashboard/GetHistoricalDataCount?los=' + selectedLosName + '&sbu=' + selectedSbuName,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Show full page LoadingOverlay
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();

            var total = result.total_Data;

            $('#total_record_count').html(unescape(escape(total)));
            $('#historical_Pending_Count').html(unescape(escape(result.pending)));
            $('#historical_Assigned_Count').html(unescape(escape(result.assigned)));
            $('#historical_Completed_Count').html(unescape(escape(result.completed)));

            var pending_Progress = 0;
            var assigned_Progress = 0;
            var completed_Progress = 0;

            if (total != 0) {
                pending_Progress = (result.pending * 100 / total);
                assigned_Progress = (result.assigned * 100 / total);
                completed_Progress = (result.completed * 100 / total);
            }

            $('#historical_Pending_Progress').css('width', pending_Progress + '%');
            $('#historical_Assigned_Progress').css('width', assigned_Progress + '%');
            $('#historical_Completed_Progress').css('width', completed_Progress + '%');

        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function GetRequestsAnalytics(LOS, SBU) {
    $('#userProgressBar').show();
    var losSearch = selectedLos;
    var sbuSearch = selectedSbu;
    if (LOS != "" && SBU != "" && LOS != null && SBU != null) {
        losSearch = LOS;
        sbuSearch = SBU;
    }
    $.ajax({
        url: '/Dashboard/GetDashboardCount?tab=1&los=' + losSearch + '&sbu=' + sbuSearch,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Show full page LoadingOverlay
            $('#loaders_3').show();
        },
        success: function (result) {
            $('#loaders_3').hide();

            var total = result.total_Request;

            $('#total_user_count').html(unescape(escape(total)));
            $('#Risk_Manager_Count').html(unescape(escape(result.retrieved_Count)));
            $('#File_Coordinator_Count').html(unescape(escape(result.reArchived_Count)));
            $('#Admin_Count').html(unescape(escape(result.disposed_Count)));
            $('#SUper_Admin_Count').html(unescape(escape(result.archived_Count)));

            var risk_Manager_Progress = 0;
            var fileCoOrdinator_Progress = 0;
            var admin_Progress = 0;
            var super_admin_Progress = 0;

            if (total != 0) {
                risk_Manager_Progress = (result.retrieved_Count * 100 / total);
                fileCoOrdinator_Progress = (result.reArchived_Count * 100 / total);
                admin_Progress = (result.disposed_Count * 100 / total);
                super_admin_Progress = (result.archived_Count * 100 / total);
            }

            $('#risk_Manager_Progress').css('width', risk_Manager_Progress + '%');
            $('#fileCoOrdinator_Progress').css('width', fileCoOrdinator_Progress + '%');
            $('#admin_Progress').css('width', admin_Progress + '%');
            $('#super_admin_Progress').css('width', super_admin_Progress + '%');

            loadDefaultChart(2, result);
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });

}

function GetUsers(LOS, SBU) {
    $('#userProgressBar').show();
    var losSearch = selectedLos;
    var sbuSearch = selectedSbu;
    if (LOS != "" && SBU != "" && LOS != null && SBU != null) {
        losSearch = LOS;
        sbuSearch = SBU;
    }
    $.ajax({
        url: '/Dashboard/GetUsersDataCount?los=' + losSearch + '&sbu=' + sbuSearch,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Show full page LoadingOverlay
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();

            var total = result.total_User;

            $('#total_user_count').html(unescape(escape(total)));
            $('#Risk_Manager_Count').html(unescape(escape(result.risk_Manager)));
            $('#File_Coordinator_Count').html(unescape(escape(result.file_Coordinator)));
            $('#Bussiness_Coordinator_Count').html(unescape(escape(result.bS_Coordinator)));
            $('#Auditor_Count').html(unescape(escape(result.auditor)));
            $('#OGC_Count').html(unescape(escape(result.ogC_Team)));
            $('#Admin_Count').html(unescape(escape(result.admin)));

            if (userRoleID == "11") {
                $('#SUper_Admin_Count').html(unescape(escape(result.superAdmin)));
            }

            var risk_Manager_Progress = 0;
            var fileCoOrdinator_Progress = 0;
            var bsCoOrdinator_Progress = 0;
            var auditor_Progress = 0;
            var ogc_Progress = 0;
            var admin_Progress = 0;
            var super_admin_Progress = 0;

            if (total != 0) {
                risk_Manager_Progress = (result.risk_Manager * 100 / total);
                fileCoOrdinator_Progress = (result.file_Coordinator * 100 / total);
                bsCoOrdinator_Progress = (result.bS_Coordinator * 100 / total);
                auditor_Progress = (result.auditor * 100 / total);
                ogc_Progress = (result.ogC_Team * 100 / total);
                admin_Progress = (result.admin * 100 / total);
                if (userRoleID == "11") {
                    super_admin_Progress = (result.superAdmin * 100 / total);
                }
            }

            $('#risk_Manager_Progress').css('width', risk_Manager_Progress + '%');
            $('#fileCoOrdinator_Progress').css('width', fileCoOrdinator_Progress + '%');
            $('#bsCoOrdinator_Progress').css('width', bsCoOrdinator_Progress + '%');
            $('#auditor_Progress').css('width', auditor_Progress + '%');
            $('#ogc_Progress').css('width', ogc_Progress + '%');
            $('#admin_Progress').css('width', admin_Progress + '%');
            if (userRoleID == "11") {
                $('#super_admin_Progress').css('width', super_admin_Progress + '%');
            }

            //$('#risk_Manager_Progress_Name').css('width', risk_Manager_Progress + '%');
            //$('#fileCoOrdinator_Progress_Name').css('width', fileCoOrdinator_Progress + '%');
            //$('#bsCoOrdinator_Progress_Name').css('width', bsCoOrdinator_Progress + '%');
            //$('#auditor_Progress_Name').css('width', auditor_Progress + '%');
            //$('#ogc_Progress_Name').css('width', ogc_Progress + '%');
            //$('#admin_Progress_Name').css('width', admin_Progress + '%');
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });

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
                            selectedLos = result[i].loS_Code;
                            selectedLosName = result[i].loS_Name;
                            break;
                        }
                    }
                    $("#fltrLos").val(id);
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
                            selectedSbu = result[i].sbU_Code;
                            selectedSbuName = result[i].sbU_Name;
                            break;
                        }
                    }
                    $("#fltrSbu").val(id);
                    GetRequestsAnalytics(selectedLos, selectedSbu);
                    GetHistoricalDataCount();
                    //loadChart(1, 1);
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


function GetVendors() {
    $('#vendor_drop').val("");
    $.ajax({
        url: '/Vendor/GetVendors?losCode=' + losCode + '&sbuCode=' + sbuCode,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            $('#vendor_drop').html(unescape(escape(html)));
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    $("select.dynamic-option-create-createTag").select2({
        //tags: true,
        multiple: true,
        //createTag: (params) => {
        //    return {
        //        id: params.term.length,
        //        text: params.term,
        //    };
        //}
    });
}

function TeamsGovernmentClientFilter() {
    if (document.getElementById('teamsGovernmentClientCheckBox').checked) {
        IsGovernmentClientFilter = 1;
    }
    else {
        IsGovernmentClientFilter = 0;
    }
    loadTeamsData(1, teamType);
}

function loadFirstTeamsData(Page, type, tab) {
    var Limit = 10;
    teamType = type;

    var heading = "Total Requests";

    $('#TeamRequestHeading').html(unescape(escape(heading)));
    $('#type').val(type);
    $('#tab').val(tabType);
    $('#teamsGovernmentClientCheckBox').val(IsGovernmentClientFilter);
    $('#isFromDashboard_Export').val(true);
    $('#vendorList').val(selectedVendor);

    var html = '';
    var staticHtml = '';
    var sNo = ((Page - 1) * Limit);
    var totalCount = teamRequestTotalCount;
    var requestStatusID = 0;
    var reqType = 0;

    $.each(teamRequestList, function (key, item) {
        sNo += 1;
        requestStatusID = item.status_ID;
        reqType = item.requestType_ID;

        /* html += '<tr id=' + item.request_ID + '>';*/
        html += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + '>';

        staticHtml += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + '>';

        html += '<th scope="row" class="fnt14">' + sNo + '</td>';
        html += '<td class="fnt14">' + item.request_ID + '</td>';
        html += '<td class="fnt14">' + item.r_StartDate_Formatted + '</td>';
        html += '<td class="fnt14">' + item.retention_Period_Compeltion + '</td>';
        html += '<td class="fnt14">' + item.r_CompletedDate_Formatted + '</td>';
        html += '<td class="fnt14">' + item.engagement_Manager + '</td>';
        html += '<td class="fnt14">' + item.engagement_Partner + '</td>';
        html += '<td class="fnt14">' + item.entity_Name + '</td>';
        html += '<td class="fnt14">' + item.vendor_Name + '</td>';
        html += '<td class="fnt14">' + item.requestType + '</td>';
        html += '<td class="fnt14">' + item.requester_Name + '</td>';
        html += '<td class="fnt14">' + item.createdDate_Formatted + '</td>';
        html += '<td class="fnt14">' + item.approved_By + '</td>';
        html += '<td class="fnt14">' + item.approverDesignation + '</td>';
        html += '<td class="fnt14">' + item.lastRequestApproval + '</td>';

        html += '<td>'
        html += '<a href="/Request/AuditHistory?requestID=' + item.request_ID + '&requesrType_ID=' + item.requestType_ID + '&Pagetype=' + 1 + '">'
        html += '<span class="icon-Audit-history icon-weight" style="color:black;font-size: 15px !important;"></span>'
        html += '</a>'
        html += '</td>'

        if (item.is_Government_Client == 1) {
            staticHtml += '<td class="fnt14 governmentClientStyle">' + item.client_Name + '</td>';
        }
        else {
            staticHtml += '<td class="fnt14">' + item.client_Name + '</td>';
        }

        if (item.fileType == "Preserve")
            staticHtml += '<td class="fnt14 legalStyle">' + item.fileType + '</td>';
        else
            staticHtml += '<td class="fnt14">' + item.fileType + '</td>';

        staticHtml += '<td class="fnt14" id=' + requestStatusID + '><div class="status-report status-report  custom_color" style="background-color:' + item.status_Code + '">' + item.status + '</div></td>';

        staticHtml += '</tr>';
        html += '</tr>';
    });
    if (totalCount == 0) {
        html += '<tr>';
        html += '<td></td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '<td style="color:red;">No Record(s) Found!</td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '</tr>';

        staticHtml += '<tr>';
        staticHtml += '<td></td>';
        staticHtml += '<td style="Visibility:hidden">No Record(s) Found!</td>';
        staticHtml += '<td></td>';
        staticHtml += '</tr>';
    }

    $('#teams_Grid_Data').html(html);
    $('#teams_Static_Grid_Data').html(staticHtml);
    $('#teams_Grid_Data tr').on('click', 'td', function () {
        window.location.href = "/Request/CreateRequest?page=Detail&requestID=" + $(this).closest('tr').attr('id') + '&requestType_ID=' + + $(this).closest('tr').attr('reqtype') + '&pageType=' + 1 + '&status=' + $(this).closest('tr').attr('val') + '&IsFromDashboard=true'
    });

    $('#pageEntry').html(unescape(escape('Showing 10 of ' + teamRequestTotalCount + ' entries')));
    if (totalCount != 0) {

        var pagination = '';

        pagination += '<ul class="pagination pagg_align">';
        pagination += '<li class="page-item"><a class="page-link" onclick=loadTeamsData(' + 1 + ',' + type + ',' + tab + ') ><span style="font-weight:bold"> << </span> </a></li>';
        if (Page == 1) {
            pagination += '<li class="page-item"><a class="page-link" disabled> Prev</a></li>';
        }
        else {
            var pageNumber = Page - 1;
            pagination += '<li class="page-item"><a class="page-link" onclick= loadTeamsData(' + pageNumber + ',' + type + ',' + tab + ')> Prev</a></li>';
        }

        var lastPage = (Math.floor(totalCount / Limit) + 1);
        if (Math.floor(totalCount % Limit) != 0) {
            lastPage = (Math.floor(totalCount / Limit) + 1);
        }
        else {
            lastPage = (Math.floor(totalCount / Limit));
        }
        for (pageSize = (Page - 1); (pageSize < (Page + 4) && pageSize != lastPage); pageSize++) {
            if (Page == pageSize) {
                pagination += '<li class="page-item"><a class="page-link active">' + pageSize + '</a></li >';
            }
            else if (pageSize != 0) {
                pagination += '<li class="page-item"><a class="page-link" onclick = loadTeamsData(' + pageSize + ',' + type + ',' + tab + ')>' + pageSize + '</a></li >';
            }
        }

        // var lastPage = (Math.floor(totalCount / Limit) + 1);

        if (Page == lastPage) {
            pagination += '<li class="page-item"><a class="page-link active">' + lastPage + '</a></li >';
        }
        else {
            if (lastPage - Page >= 5) {
                pagination += '<li class="page-item"><a class="page-link">....</a></li >';
            }
            pagination += '<li class="page-item"><a class="page-link" onclick =  loadTeamsData(' + lastPage + ',' + type + ',' + tab + ')>' + lastPage + '</a></li >';
        }

        if (Page == (Math.floor(totalCount / Limit) + 1)) {
            pagination += '<li class="page-item"><a class="page-link" disabled>Next </a></li >';
        }
        else {
            var pageNumber = Page + 1;
            pagination += '<li class="page-item"><a class="page-link" onclick= loadTeamsData(' + pageNumber + ',' + type + ',' + tab + ')>Next </a></li >';
        }
        pagination += '<li class="page-item"><a class="page-link" onclick=loadTeamsData(' + lastPage + ',' + type + ',' + tab + ') ><span style="font-weight:bold"> >> </span> </a></li>';
        pagination += '</ul>';
        $('.teams_grid_pagination').html(pagination);
    }
    else {
        $('.teams_grid_pagination').html('');
    }
}


function loadTeamsData(Page, type, tab) {
    var Limit = 10;
    teamType = type;

    var heading = "Total Requests";
    if (type == 1) {
        heading = "Retention Period Completed Requests";
    }
    else if (type == 2) {
        heading = "Requests Due For Disposal In One year";
    }
    else if (type == 3) {
        heading = "Disposed Requests";
    }
    else if (type == 4) {
        heading = "Request With Client Original Docs";
    }
    else if (type == 5) {
        heading = "Request On Preserved";
    }

    $('#TeamRequestHeading').html(unescape(escape(heading)));
    $('#type').val(type);
    $('#tab').val(tabType);
    $('#teamsGovernmentClientCheckBox').val(IsGovernmentClientFilter);
    $('#isFromDashboard_Export').val(true);
    $('#vendorList').val(selectedVendor);
    var jsonData = {
        requestId: $('#requestId').val(),
        createdDate: $('#createdDate').val(),
        createdBy: $('#createdBy').val(),
        engagementManager: $('#engagementManager').val(),
        engagementPartner: $('#engagementPartner').val(),
        fltrFileType: $('#fileType').val(),
        requestType: $('#requestType').val(),
        status: $('#status').val(),
        approverName: $('#approverName').val(),
        approverDesignation: $('#approverDesignation').val(),
        lastRequestApproval: $('#lastRequestApproval').val(),
        R_StartDateSearch: $('#startDate').val(),
        R_YrSearch: $('#retention').val(),
        R_CompletedDateSearch: $('#retentionCompletedDate').val(),
        clientName: $('#clientName').val(),
        entityName: $('#entityName').val(),
        Is_Government_Client: IsGovernmentClientFilter,
        page: Page,
        limit: Limit,
        sort: sort,
        order: Order,
    }

    var data = new FormData();
    data.append("RequestInput", JSON.stringify(jsonData));
    data.append("Type", type);
    data.append('__RequestVerificationToken', token);

    $.ajax({
        url: '/Dashboard/GetTeamRequestList?tab=' + tabType + '&vendorList=' + selectedVendor,
        data: data,
        type: "POST",
        contentType: false,
        processData: false,
        beforeSend: function () {
            // Show full page LoadingOverlay    
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();
            var html = '';
            var staticHtml = '';
            var sNo = ((Page - 1) * Limit);
            var totalCount = result.totalCount;
            var requestStatusID = 0;
            var reqType = 0;

            $.each(result.requests, function (key, item) {
                sNo += 1;
                requestStatusID = item.status_ID;
                reqType = item.requestType_ID;

                /* html += '<tr id=' + item.request_ID + '>';*/
                html += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + '>';

                staticHtml += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + '>';

                html += '<th scope="row" class="fnt14">' + sNo + '</td>';
                html += '<td class="fnt14">' + item.request_ID + '</td>';
                html += '<td class="fnt14">' + item.r_StartDate_Formatted + '</td>';
                html += '<td class="fnt14">' + item.retention_Period_Compeltion + '</td>';
                html += '<td class="fnt14">' + item.r_CompletedDate_Formatted + '</td>';
                html += '<td class="fnt14">' + item.engagement_Manager + '</td>';
                html += '<td class="fnt14">' + item.engagement_Partner + '</td>';
                html += '<td class="fnt14">' + item.entity_Name + '</td>';
                html += '<td class="fnt14">' + item.vendor_Name + '</td>';
                html += '<td class="fnt14">' + item.requestType + '</td>';
                html += '<td class="fnt14">' + item.requester_Name + '</td>';
                html += '<td class="fnt14">' + item.createdDate_Formatted + '</td>';
                html += '<td class="fnt14">' + item.approved_By + '</td>';
                html += '<td class="fnt14">' + item.approverDesignation + '</td>';
                html += '<td class="fnt14">' + item.lastRequestApproval + '</td>';

                html += '<td>'
                html += '<a href="/Request/AuditHistory?requestID=' + item.request_ID + '&requesrType_ID=' + item.requestType_ID + '&Pagetype=' + 1 + '">'
                html += '<span class="icon-Audit-history icon-weight" style="color:black;font-size: 15px !important;"></span>'
                html += '</a>'
                html += '</td>'

                if (item.is_Government_Client == 1) {
                    staticHtml += '<td class="fnt14 governmentClientStyle">' + item.client_Name + '</td>';
                }
                else {
                    staticHtml += '<td class="fnt14">' + item.client_Name + '</td>';
                }

                if (item.fileType == "Preserve")
                    staticHtml += '<td class="fnt14 legalStyle">' + item.fileType + '</td>';
                else
                    staticHtml += '<td class="fnt14">' + item.fileType + '</td>';

                staticHtml += '<td class="fnt14" id=' + requestStatusID + '><div class="status-report status-report  custom_color" style="background-color:' + item.status_Code + '">' + item.status + '</div></td>';

                staticHtml += '</tr>';
                html += '</tr>';
            });
            if (totalCount == 0) {
                html += '<tr>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td style="color:red;">No Record(s) Found!</td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '</tr>';

                staticHtml += '<tr>';
                staticHtml += '<td></td>';
                staticHtml += '<td style="Visibility:hidden">No Record(s) Found!</td>';
                staticHtml += '<td></td>';
                staticHtml += '</tr>';
            }

            $('#teams_Grid_Data').html(html);
            $('#teams_Static_Grid_Data').html(staticHtml);
            $('#teams_Grid_Data tr').on('click', 'td', function () {
                window.location.href = "/Request/CreateRequest?page=Detail&requestID=" + $(this).closest('tr').attr('id') + '&requestType_ID=' + + $(this).closest('tr').attr('reqtype') + '&pageType=' + 1 + '&status=' + $(this).closest('tr').attr('val') + '&IsFromDashboard=true'
            });

            $('#pageEntry').html(unescape(escape('Showing 10 of ' + result.totalCount + ' entries')));
            if (totalCount != 0) {

                var pagination = '';

                pagination += '<ul class="pagination pagg_align">';
                pagination += '<li class="page-item"><a class="page-link" onclick=loadTeamsData(' + 1 + ',' + type + ',' + tab + ') ><span style="font-weight:bold"> << </span> </a></li>';
                if (Page == 1) {
                    pagination += '<li class="page-item"><a class="page-link" disabled> Prev</a></li>';
                }
                else {
                    var pageNumber = Page - 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick= loadTeamsData(' + pageNumber + ',' + type + ',' + tab + ')> Prev</a></li>';
                }

                var lastPage = (Math.floor(totalCount / Limit) + 1);
                if (Math.floor(totalCount % Limit) != 0) {
                    lastPage = (Math.floor(totalCount / Limit) + 1);
                }
                else {
                    lastPage = (Math.floor(totalCount / Limit));
                }
                for (pageSize = (Page - 1); (pageSize < (Page + 4) && pageSize != lastPage); pageSize++) {
                    if (Page == pageSize) {
                        pagination += '<li class="page-item"><a class="page-link active">' + pageSize + '</a></li >';
                    }
                    else if (pageSize != 0) {
                        pagination += '<li class="page-item"><a class="page-link" onclick = loadTeamsData(' + pageSize + ',' + type + ',' + tab + ')>' + pageSize + '</a></li >';
                    }
                }

                // var lastPage = (Math.floor(totalCount / Limit) + 1);

                if (Page == lastPage) {
                    pagination += '<li class="page-item"><a class="page-link active">' + lastPage + '</a></li >';
                }
                else {
                    if (lastPage - Page >= 5) {
                        pagination += '<li class="page-item"><a class="page-link">....</a></li >';
                    }
                    pagination += '<li class="page-item"><a class="page-link" onclick =  loadTeamsData(' + lastPage + ',' + type + ',' + tab + ')>' + lastPage + '</a></li >';
                }

                if (Page == (Math.floor(totalCount / Limit) + 1)) {
                    pagination += '<li class="page-item"><a class="page-link" disabled>Next </a></li >';
                }
                else {
                    var pageNumber = Page + 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick= loadTeamsData(' + pageNumber + ',' + type + ',' + tab + ')>Next </a></li >';
                }
                pagination += '<li class="page-item"><a class="page-link" onclick=loadTeamsData(' + lastPage + ',' + type + ',' + tab + ') ><span style="font-weight:bold"> >> </span> </a></li>';
                pagination += '</ul>';
                $('.teams_grid_pagination').html(pagination);
            }
            else {
                $('.teams_grid_pagination').html('');
            }
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function GetVendorWidget() {
    $.ajax({
        url: '/Dashboard/GetVendorWidgetCount',
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Show full page LoadingOverlay
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();
            $('#total_request_vendor').html(unescape(escape(result.total_Request)));
            $('#pending_request_vendor').html(unescape(escape(result.pending_request_vendor)));
            $('#disposal_request_vendor').html(unescape(escape(result.disposal_request_vendor)));
            $('#waiting_request_vendor').html(unescape(escape(result.waiting_request_vendor)));

        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function getTeamsProgressBar(tab) {
    IsGovernmentClientFilter = 0;
    tabType = tab;
    if (tab == 2) {
        $('#vendorSelection').show();
        $('#tab_Heading').html(unescape(escape('Vendor Requests')));
        $('#vendor_Widget').show();
        GetVendorWidget();
    }
    else {
        $('#vendorSelection').hide();
        $('#vendor_Widget').hide();
        $('#tab_Heading').html(unescape(escape('Team Requests')));
    }
    document.getElementById("teamsGovernmentClientCheckBox").checked = false;
    $.ajax({
        url: '/Dashboard/GetTeamsDataCount?tab=' + tab + '&vendorList=' + selectedVendor,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Show full page LoadingOverlay
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();

            var total = result.total_Request;

            $('#progress_Total_request').html(unescape(escape(total)));
            $('#retention_Completed').html(unescape(escape(result.retention_Period_Completed)));
            $('#due_For_Disposal').html(unescape(escape(result.due_For_Disposal_In_One_year)));
            $('#disposed_Request').html(unescape(escape(result.disposed_Request)));
            $('#request_With_Client_Docs').html(unescape(escape(result.request_With_Client_Original_Docs)));
            $('#request_On_Legal_Hold').html(unescape(escape(result.request_On_Legal_Holds)));

            var retention_Completed_Progress = 0;
            var due_For_Disposal_Progress = 0;
            var disposed_Request_Progress = 0;
            var request_With_Client_Docs_Progress = 0;
            var request_On_Legal_Hold_Progress = 0;

            if (total != 0) {
                retention_Completed_Progress = (result.retention_Period_Completed * 100 / total);
                due_For_Disposal_Progress = (result.due_For_Disposal_In_One_year * 100 / total);
                disposed_Request_Progress = (result.disposed_Request * 100 / total);
                request_With_Client_Docs_Progress = (result.request_With_Client_Original_Docs * 100 / total);
                request_On_Legal_Hold_Progress = (result.request_On_Legal_Holds * 100 / total);
            }

            $('#retention_Completed_Progress').css('width', retention_Completed_Progress + '%');
            $('#due_For_Disposal_Progress').css('width', due_For_Disposal_Progress + '%');
            $('#disposed_Request_Progress').css('width', disposed_Request_Progress + '%');
            $('#request_With_Client_Docs_Progress').css('width', request_With_Client_Docs_Progress + '%');
            $('#request_On_Legal_Hold_Progress').css('width', request_On_Legal_Hold_Progress + '%');


            teamRequestTotalCount = result.team_Data.totalCount;
            teamRequestList = result.team_Data.requests;
            loadFirstTeamsData(1, 0, tab);
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function teamsDataSearch() {
    loadTeamsData(1, teamType, tabType);
}

function teamsSortTable(sortData) {
    if (Order == "ASC" && PreviousSort == sortData) {
        Order = "DESC"
    }
    else {
        Order = "ASC"
    }
    Sort = sortData;
    PreviousSort = Sort;
    loadTeamsData(1, teamType, tabType);
}

function GovernmentClientFilter() {
    if (document.getElementById('governmentClientCheckBox').checked) {
        IsGovernmentClientFilter = 1;
    }
    else {
        IsGovernmentClientFilter = 0;
    }
    GetConnectionList(1, StatusID, IsLegal, currentTitle, currentChart, currentWidgetType);
}

function loadData(tab) {
    IsGovernmentClientFilter = 0;
    document.getElementById("governmentClientCheckBox").checked = false;
    currentWidgetType = tab;

    $.ajax({
        url: '/Dashboard/GetDashboardCount?tab=' + tab,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Show full page LoadingOverlay
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();

            if (tab == 1) {
                $('#my_Action_Widget').hide();
                $('#my_Request_Widget').show();

                $('#inprogressCount').html(unescape(escape(result.inProgress_Count)));
                $('#pendingCount').html(unescape(escape(result.pending_Count)));
                $('#rejectedCount').html(unescape(escape(result.rejected_Count)));
                $('#holdCount').html(unescape(escape(result.hold_Count)));
            }
            else {
                $('#my_Request_Widget').hide();
                $('#my_Action_Widget').show();

                $('#actioninprogressCount').html(unescape(escape(result.inProgress_Count)));
                $('#actionpendingCount').html(unescape(escape(result.pending_Count)));
                $('#actionrejectedCount').html(unescape(escape(result.rejected_Count)));
                $('#actionholdCount').html(unescape(escape(result.hold_Count)));
            }

            //loadChart(1, tab);
            loadDefaultChart(2, result);
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function loadDefaultChart(ChartType, result) {
    IsGovernmentClientFilter = 0;
    document.getElementById("governmentClientCheckBox").checked = false;

    var connectionID = [];
    var xValues = [];
    var yValues = [];
    var barColors = [];
    currentChart = ChartType;

    var html = '';
    var FilTypehtml = '';
    var count = 0;
    var totalConnects = 0;
    requestTotalCount = result.chart_Data.requestTotalCount;
    requestList = result.chart_Data.requests;

    if (ChartType == 1) {
        html += '<br/>'
        html += '<center>'
        html += '<table>'
        html += '<tr>'
        $.each(result.chart_Data.chart_Data, function (key, item) {
            count += 1;
            connectionID.push(item.status_ID);
            xValues.push(item.status_Name);
            yValues.push(item.count);
            barColors.push(item.color);
            totalConnects += item.count;
            var name = "'".concat(item.status_Name);
            var fullName = name.concat("'");
            if ((count - 1) % 2 == 0 && count >= 2) {
                html += '</tr><tr>'
            }
            html += '<td class="fnt14 d-flex">';
            html += '<div class="status-one" style="border-radius:50%;background-color:' + item.color + '"></div>';
            html += '<th style="cursor: pointer;color:gray;padding-bottom:.5rem" onclick="GetConnectionList(' + 1 + ',' + item.status_ID + ',' + 10 + ',' + fullName + ',' + ChartType + ',' + currentWidgetType + ')">' + item.status_Name + '&nbsp; -  ' + item.count + '</th>';
            html += '</td>';
            html += '<td>&nbsp;&nbsp;</td>';
        });
        html += '</tr>';
        html += '</table>';
        html += '</center>'
    }
    else {
        FilTypehtml += '<br/>'
        FilTypehtml += '<center>'
        FilTypehtml += '<table>'
        $.each(result.chart_Data.chart_Data, function (key, item) {
            connectionID.push(item.islegal);
            xValues.push(item.fileType);
            yValues.push(item.count);
            barColors.push(item.color);
            totalConnects += item.count;
            var name = "'".concat(item.fileType);
            var fullName = name.concat("'");
            FilTypehtml += '<tr>'
            FilTypehtml += '<td class="fnt14 d-flex">';
            FilTypehtml += '<div class="status-one" style="border-radius:50%;background-color:' + item.color + '"></div>';
            FilTypehtml += '</td>';
            FilTypehtml += '<td></td>';
            FilTypehtml += '<td style="cursor: pointer;color:gray;padding-bottom:.5rem" onclick="GetConnectionList(' + 1 + ',' + 0 + ',' + item.islegal + ',' + fullName + ',' + ChartType + ',' + currentWidgetType + ')">' + item.fileType + '&nbsp; -  ' + item.count + '&nbsp;&nbsp;&nbsp;</td>';
            FilTypehtml += '</tr>';
        });
        FilTypehtml += '</table>';
        FilTypehtml += '</center>'
    }

    if (ChartType == 1) {
        $('#myRequests_chart_labels').html(unescape(escape(html)));
        Chart.pluginService.register({
            beforeDraw: function (chart) {
                var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;
                ctx.restore();
                var fontSize = (height / 114).toFixed(2);
                ctx.font = "30px Helvetica Neue";
                ctx.textBaseline = "middle";
                var text = chart.config.options.elements.center.text,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        });

        if (totalConnects != 0) {
            var myNewChart = new Chart("myRequests", {
                type: "doughnut",
                data: {
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues,
                        id: connectionID
                    }],
                    labels: xValues,
                    borderWidth: 50,
                    hoverBorderColor: barColors,
                    hoverOffset: 0
                },
                options: {
                    cutoutPercentage: 90,
                    dataLabels: {
                        enabled: false
                    },
                    elements: {
                        center: {
                            text: totalConnects
                        }
                    },
                    hover: {
                        onHover: function (e) {
                            $("#myRequests").css("cursor", e[0] ? "pointer" : "default");
                        }
                    },
                    legend: {
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        },
                        position: 'bottom',
                        display: false,
                    }
                }
            });
        }
        else {
            var myNewChart = new Chart("myRequests", {
                type: "doughnut",
                data: {
                    datasets: [{
                        backgroundColor: ['#DEDEDE'],
                        data: ['100'],
                        id: ['0']
                    }],
                    labels: ['No Request'],
                    borderWidth: 50,
                    hoverBorderColor: barColors,
                    hoverOffset: 0
                },
                options: {
                    cutoutPercentage: 90,
                    dataLabels: {
                        enabled: false
                    },
                    elements: {
                        center: {
                            text: totalConnects
                        }
                    },
                    hover: {
                        onHover: function (e) {
                            $("#myRequests").css("cursor", e[0] ? "pointer" : "default");
                        }
                    },
                    legend: {
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        },
                        position: 'bottom',
                        display: false,
                    }
                }
            });
        }

        if (totalConnects != 0) {
            var canvas = document.getElementById("myRequests");
            canvas.onclick = function (evt) {
                var activePoints = myNewChart.getElementsAtEvent(evt);
                if (activePoints[0]) {
                    var chartData = activePoints[0]['_chart'].config.data;
                    var idx = activePoints[0]['_index'];

                    var label = chartData.labels[idx];
                    var value = chartData.datasets[0].data[idx];
                    var connection = chartData.datasets[0].id[idx];
                    var fileType = 10;

                    GetConnectionList(1, connection, fileType, label, ChartType, currentWidgetType);
                }
            };
        }
        if (userRole == "SuperAdmin" || userRole == "Admin") {
            GetFirstConnectionList(1, 2, 10, 'Pending', ChartType, currentWidgetType);
        }
        else {
            GetFirstConnectionList(1, 5, 10, 'Archived', ChartType, currentWidgetType);
        }
    }
    else {
        $('#fileType_chart_labels').html(unescape(escape(FilTypehtml)));

        Chart.pluginService.register({
            beforeDraw: function (chart) {
                var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;
                ctx.restore();
                var fontSize = (height / 114).toFixed(2);
                ctx.font = "30px Helvetica Neue";
                ctx.textBaseline = "middle";
                var text = chart.config.options.elements.center.text,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        });
        if (totalConnects != 0) {
            var myNewChart = new Chart("fileTypeChart", {
                type: "doughnut",
                data: {
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues,
                        id: connectionID
                    }],
                    labels: xValues,
                    borderWidth: 5,
                    hoverBorderColor: barColors,
                    hoverOffset: 0
                },
                options: {
                    cutoutPercentage: 90,
                    dataLabels: {
                        enabled: false
                    },
                    elements: {
                        center: {
                            text: totalConnects
                        }
                    },
                    legend: {
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        },
                        position: 'bottom',
                        display: false
                    }
                }
            });
        }
        else {
            var myNewChart = new Chart("fileTypeChart", {
                type: "doughnut",
                data: {
                    datasets: [{
                        backgroundColor: ['#DEDEDE'],
                        data: ['100'],
                        id: ['0']
                    }],
                    labels: ['No Request'],
                    borderWidth: 50,
                    hoverBorderColor: barColors,
                    hoverOffset: 0
                },
                options: {
                    cutoutPercentage: 90,
                    dataLabels: {
                        enabled: false
                    },
                    elements: {
                        center: {
                            text: totalConnects
                        }
                    },
                    legend: {
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        },
                        position: 'bottom',
                        display: false
                    }
                }
            });
        }

        if (totalConnects != 0) {
            var canvas = document.getElementById("fileTypeChart");
            canvas.onclick = function (evt) {
                var activePoints = myNewChart.getElementsAtEvent(evt);
                if (activePoints[0]) {
                    var chartData = activePoints[0]['_chart'].config.data;
                    var idx = activePoints[0]['_index'];

                    var label = chartData.labels[idx];
                    var value = chartData.datasets[0].data[idx];
                    var connection = 0;
                    var fileType = chartData.datasets[0].id[idx];

                    GetConnectionList(1, connection, fileType, label, ChartType, currentWidgetType);
                }
            };
        }
        GetFirstConnectionList(1, 0, 1, "Preserve", ChartType, currentWidgetType);
    }
    $('#loaders_1').hide();
}

function loadChart(ChartType, tab) {
    IsGovernmentClientFilter = 0;
    document.getElementById("governmentClientCheckBox").checked = false;

    var connectionID = [];
    var xValues = [];
    var yValues = [];
    var barColors = [];
    currentChart = ChartType;

    $.ajax({
        url: '/Dashboard/GetChartData?chartType=' + ChartType + '&tab=' + currentWidgetType + '&los=' + selectedLos + '&sbu=' + selectedSbu,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Show full page LoadingOverlay
            $('#loaders_1').show();
        },
        success: function (result) {
            var html = '';
            var FilTypehtml = '';
            var count = 0;
            var totalConnects = 0;
            requestTotalCount = result.requestTotalCount;
            requestList = result.requests;

            if (ChartType == 1) {
                html += '<br/>'
                html += '<center>'
                html += '<table>'
                html += '<tr>'
                $.each(result.chart_Data, function (key, item) {
                    count += 1;
                    connectionID.push(item.status_ID);
                    xValues.push(item.status_Name);
                    yValues.push(item.count);
                    barColors.push(item.color);
                    totalConnects += item.count;
                    var name = "'".concat(item.status_Name);
                    var fullName = name.concat("'");
                    if ((count - 1) % 2 == 0 && count >= 2) {
                        html += '</tr><tr>'
                    }
                    html += '<td class="fnt14 d-flex">';
                    html += '<div class="status-one" style="border-radius:50%;background-color:' + item.color + '"></div>';
                    html += '<th style="cursor: pointer;color:gray;padding-bottom:.5rem" onclick="GetConnectionList(' + 1 + ',' + item.status_ID + ',' + 10 + ',' + fullName + ',' + ChartType + ',' + currentWidgetType + ')">' + item.status_Name + '&nbsp; -  ' + item.count + '</th>';
                    /* html += '<div class="menu-pad ellipseText">' + item.count + '</div>';*/
                    html += '</td>';
                    html += '<td>&nbsp;&nbsp;</td>';
                    //if ((count - 1) % 2 == 0 && count >= 2) {
                    //    html += '</tr><tr>'
                    //}

                });
                html += '</tr>';
                html += '</table>';
                html += '</center>'

            }
            else {
                FilTypehtml += '<br/>'
                FilTypehtml += '<center>'
                FilTypehtml += '<table>'
                $.each(result.chart_Data, function (key, item) {
                    //count2 += 1;
                    connectionID.push(item.islegal);
                    xValues.push(item.fileType);
                    yValues.push(item.count);
                    barColors.push(item.color);
                    totalConnects += item.count;
                    var name = "'".concat(item.fileType);
                    var fullName = name.concat("'");
                    FilTypehtml += '<tr>'
                    FilTypehtml += '<td class="fnt14 d-flex">';
                    FilTypehtml += '<div class="status-one" style="border-radius:50%;background-color:' + item.color + '"></div>';
                    /*  FilTypehtml += '<div class="menu-pad ellipseText">' + item.count + '</div>';*/
                    FilTypehtml += '</td>';
                    FilTypehtml += '<td></td>';
                    FilTypehtml += '<td style="cursor: pointer;color:gray;padding-bottom:.5rem" onclick="GetConnectionList(' + 1 + ',' + 0 + ',' + item.islegal + ',' + fullName + ',' + ChartType + ',' + currentWidgetType + ')">' + item.fileType + '&nbsp; -  ' + item.count + '&nbsp;&nbsp;&nbsp;</td>';
                    FilTypehtml += '</tr>';
                });
                FilTypehtml += '</table>';
                FilTypehtml += '</center>'

            }

            if (ChartType == 1) {
                $('#myRequests_chart_labels').html(unescape(escape(html)));
                Chart.pluginService.register({
                    beforeDraw: function (chart) {
                        var width = chart.chart.width,
                            height = chart.chart.height,
                            ctx = chart.chart.ctx;
                        ctx.restore();
                        var fontSize = (height / 114).toFixed(2);
                        ctx.font = "30px Helvetica Neue";
                        ctx.textBaseline = "middle";
                        var text = chart.config.options.elements.center.text,
                            textX = Math.round((width - ctx.measureText(text).width) / 2),
                            textY = height / 2;
                        ctx.fillText(text, textX, textY);
                        ctx.save();
                    }
                });

                if (totalConnects != 0) {
                    var myNewChart = new Chart("myRequests", {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                backgroundColor: barColors,
                                data: yValues,
                                id: connectionID
                            }],
                            labels: xValues,
                            borderWidth: 50,
                            hoverBorderColor: barColors,
                            hoverOffset: 0
                        },
                        options: {
                            cutoutPercentage: 90,
                            dataLabels: {
                                enabled: false
                            },
                            elements: {
                                center: {
                                    text: totalConnects
                                }
                            },
                            hover: {
                                onHover: function (e) {
                                    $("#myRequests").css("cursor", e[0] ? "pointer" : "default");
                                }
                            },
                            legend: {
                                animation: {
                                    animateScale: true,
                                    animateRotate: true
                                },
                                position: 'bottom',
                                display: false,
                            }
                        }
                    });
                }
                else {
                    var myNewChart = new Chart("myRequests", {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                backgroundColor: ['#DEDEDE'],
                                data: ['100'],
                                id: ['0']
                            }],
                            labels: ['No Request'],
                            borderWidth: 50,
                            hoverBorderColor: barColors,
                            hoverOffset: 0
                        },
                        options: {
                            cutoutPercentage: 90,
                            dataLabels: {
                                enabled: false
                            },
                            elements: {
                                center: {
                                    text: totalConnects
                                }
                            },
                            hover: {
                                onHover: function (e) {
                                    $("#myRequests").css("cursor", e[0] ? "pointer" : "default");
                                }
                            },
                            legend: {
                                animation: {
                                    animateScale: true,
                                    animateRotate: true
                                },
                                position: 'bottom',
                                display: false,
                            }
                        }
                    });
                }

                //var addRadiusMargin = 10;
                if (totalConnects != 0) {
                    var canvas = document.getElementById("myRequests");
                    canvas.onclick = function (evt) {
                        var activePoints = myNewChart.getElementsAtEvent(evt);
                        //if (activePoints.length > 0) {
                        //    // update the newly selected piece
                        //    activePoints[0]['_model'].innerRadius = activePoints[0]['_model'].innerRadius +
                        //        addRadiusMargin;
                        //    activePoints[0]['_model'].outerRadius = activePoints[0]['_model'].outerRadius +
                        //        addRadiusMargin;
                        //}
                        if (activePoints[0]) {
                            var chartData = activePoints[0]['_chart'].config.data;
                            var idx = activePoints[0]['_index'];

                            var label = chartData.labels[idx];
                            var value = chartData.datasets[0].data[idx];
                            var connection = chartData.datasets[0].id[idx];
                            var fileType = 10;

                            GetConnectionList(1, connection, fileType, label, ChartType, currentWidgetType);
                        }
                    };
                }
                if (userRole == "SuperAdmin" || userRole == "Admin") {
                    GetFirstConnectionList(1, 2, 10, 'Pending', ChartType, currentWidgetType);
                }
                else {
                    GetFirstConnectionList(1, 5, 10, 'Archived', ChartType, currentWidgetType);
                }
            }
            else {
                $('#fileType_chart_labels').html(unescape(escape(FilTypehtml)));

                Chart.pluginService.register({
                    beforeDraw: function (chart) {
                        var width = chart.chart.width,
                            height = chart.chart.height,
                            ctx = chart.chart.ctx;
                        ctx.restore();
                        var fontSize = (height / 114).toFixed(2);
                        ctx.font = "30px Helvetica Neue";
                        ctx.textBaseline = "middle";
                        var text = chart.config.options.elements.center.text,
                            textX = Math.round((width - ctx.measureText(text).width) / 2),
                            textY = height / 2;
                        ctx.fillText(text, textX, textY);
                        ctx.save();
                    }
                });
                if (totalConnects != 0) {
                    var myNewChart = new Chart("fileTypeChart", {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                backgroundColor: barColors,
                                data: yValues,
                                id: connectionID
                            }],
                            labels: xValues,
                            borderWidth: 5,
                            hoverBorderColor: barColors,
                            hoverOffset: 0
                        },
                        options: {
                            cutoutPercentage: 90,
                            dataLabels: {
                                enabled: false
                            },
                            elements: {
                                center: {
                                    text: totalConnects
                                }
                            },
                            legend: {
                                animation: {
                                    animateScale: true,
                                    animateRotate: true
                                },
                                position: 'bottom',
                                display: false
                            }
                        }
                    });
                }
                else {
                    var myNewChart = new Chart("fileTypeChart", {
                        type: "doughnut",
                        data: {
                            datasets: [{
                                backgroundColor: ['#DEDEDE'],
                                data: ['100'],
                                id: ['0']
                            }],
                            labels: ['No Request'],
                            borderWidth: 50,
                            hoverBorderColor: barColors,
                            hoverOffset: 0
                        },
                        options: {
                            cutoutPercentage: 90,
                            dataLabels: {
                                enabled: false
                            },
                            elements: {
                                center: {
                                    text: totalConnects
                                }
                            },
                            legend: {
                                animation: {
                                    animateScale: true,
                                    animateRotate: true
                                },
                                position: 'bottom',
                                display: false
                            }
                        }
                    });
                }

                //var addRadiusMargin = 10;
                if (totalConnects != 0) {
                    var canvas = document.getElementById("fileTypeChart");
                    canvas.onclick = function (evt) {
                        var activePoints = myNewChart.getElementsAtEvent(evt);
                        //if (activePoints.length > 0) {
                        //    // update the newly selected piece
                        //    activePoints[0]['_model'].innerRadius = activePoints[0]['_model'].innerRadius +
                        //        addRadiusMargin;
                        //    activePoints[0]['_model'].outerRadius = activePoints[0]['_model'].outerRadius +
                        //        addRadiusMargin;
                        //}

                        if (activePoints[0]) {
                            var chartData = activePoints[0]['_chart'].config.data;
                            var idx = activePoints[0]['_index'];

                            var label = chartData.labels[idx];
                            var value = chartData.datasets[0].data[idx];
                            var connection = 0;
                            var fileType = chartData.datasets[0].id[idx];

                            GetConnectionList(1, connection, fileType, label, ChartType, currentWidgetType);
                        }
                    };
                }
                //if (fileType == "") {
                GetFirstConnectionList(1, 0, 1, "Preserve", ChartType, currentWidgetType);
                // }

            }
            $('#loaders_1').hide();
            //GetConnectionList(1, 5, "", 'Archived', ChartType);
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function GetConnectionList(Page, ID, fileType, Name, ChartType, tab) {
    var Limit = 10;

    //$('#chart_Type').val(ChartType);
    //var Limit = 10;
    StatusID = ID;
    IsLegal = fileType;
    currentTitle = Name;
    currentChart = ChartType;
    if (Name != 0) {
        StatusName = Name + " " + "Requests";
    }
    $('#StatusName').html(unescape(escape(StatusName)));

    if (ChartType == 1) {
        requestId = $('#requestId_1').val();
        createdDate = $('#createdDate_1').val();
        createdBy = $('#createdBy_1').val();
        engagementManager = $('#engagementManager_1').val();
        engagementPartner = $('#engagementPartner_1').val();
        clientName = $('#clientName_1').val();
        entityName = $('#entityName_1').val();
        vendorName = $('#vendorName_1').val();
        requestType = $('#requestType_1').val();
        status = $('#status_1').val();
        approverName = $('#approverName_1').val();
        approverDesignation = $('#approverDesignation_1').val();
        lastRequestApproval = $('#lastRequestApproval_1').val();
    }
    if (ChartType == 2) {
        requestId = $('#requestId_2').val();
        createdDate = $('#createdDate_2').val();
        createdBy = $('#createdBy_2').val();
        engagementManager = $('#engagementManager_2').val();
        engagementPartner = $('#engagementPartner_2').val();
        clientName = $('#clientName_2').val();
        entityName = $('#entityName_2').val();
        vendorName = $('#vendorName_2').val();
        requestType = $('#requestType_2').val();
        status = $('#status_2').val();
        approverName = $('#approverName_2').val();
        approverDesignation = $('#approverDesignation_2').val();
        lastRequestApproval = $('#lastRequestApproval_2').val();
    }

    if (ChartType == 1) {
        StatusID = ID;
        IsLegal = fileType;
    }
    else {
        StatusID = ID;
        IsLegal = fileType;
    }
    $('#isFromDashboard_Export').val(true);
    $('#dashboardTabType').val(tab);
    $('#governmentClientCheckBox').val(IsGovernmentClientFilter);
    $('#StatusID').val(StatusID);
    $('#IsLegal').val(IsLegal);
    if (userRole == "SuperAdmin") {
        $('#Los_Export').val(selectedLos);
        $('#Sbu_Export').val(selectedSbu);
    }
    else {
        $('#Los_Export').val("");
        $('#Sbu_Export').val("");
    }
    var connection = {
        requestId: requestId,
        createdDate: createdDate,
        createdBy: createdBy,
        engagementManager: engagementManager,
        engagementPartner: engagementPartner,
        clientName: clientName,
        entityName: entityName,
        vendorName: vendorName,
        fltrFileType: IsLegal,
        requestType: requestType,
        status: status,
        approverName: approverName,
        approverDesignation: approverDesignation,
        lastRequestApproval: lastRequestApproval,
        isFromDashboard: true,
        dashboardTabType: tab,
        fltrStatus: StatusID,
        fltrLos: selectedLos,
        fltrSbu: selectedSbu,
        Is_Government_Client: IsGovernmentClientFilter,
        page: Page,
        limit: Limit,
        sort: sort,
        order: Order,
    }

    var data = new FormData();
    data.append("RequestInput", JSON.stringify(connection));
    data.append('__RequestVerificationToken', token);

    $.ajax({
        url: '/Request/GetRequestList',
        data: data,
        type: "POST",
        contentType: false,
        processData: false,
        beforeSend: function () {
            // Show full page LoadingOverlay    
            $('#loaders_2').show();
        },
        success: function (result) {
            $('#loaders_2').hide();
            var html = '';
            var staticHtml = '';
            var sNo = ((Page - 1) * Limit);
            var totalCount = result.totalCount;
            var requestStatusID = 0;
            var reqType = 0;

            $.each(result.requests, function (key, item) {
                sNo += 1;
                requestStatusID = item.status_ID;
                reqType = item.requestType_ID;

                /*html += '<tr id=' + item.request_ID + '>';*/
                html += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + '>';
                staticHtml += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + '>';
                html += '<th scope="row" class="fnt14">' + sNo + '</td>';
                html += '<td class="fnt14">' + item.request_ID + '</td>';
                html += '<td class="fnt14">' + item.createdDate_Formatted + '</td>';
                html += '<td class="fnt14">' + item.engagement_Manager + '</td>';
                html += '<td class="fnt14">' + item.engagement_Partner + '</td>';
                html += '<td class="fnt14">' + item.entity_Name + '</td>';
                html += '<td class="fnt14">' + item.vendor_Name + '</td>';
                html += '<td class="fnt14">' + item.requestType + '</td>';
                html += '<td class="fnt14">' + item.requester_Name + '</td>';
                html += '<td class="fnt14">' + item.approved_By + '</td>';
                html += '<td class="fnt14">' + item.approverDesignation + '</td>';
                if (item.approved_By != null && item.approved_By != "") {
                    html += '<td class="fnt14">' + item.lastRequestApproval + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }

                html += '<td>'
                html += '<a href="/Request/AuditHistory?requestID=' + item.request_ID + '&requesrType_ID=' + item.requestType_ID + '&Pagetype=' + 1 + '&IsFromDashboard=true' + '">'
                html += '<span class="icon-Audit-history icon-weight" style="color:black;font-size: 15px !important;"></span>'
                html += '</a>'
                html += '</td>'

                if (item.is_Government_Client == 1) {
                    staticHtml += '<td class="fnt14 governmentClientStyle">' + item.client_Name + '</td>';
                }
                else {
                    staticHtml += '<td class="fnt14">' + item.client_Name + '</td>';
                }

                if (item.fileType == "Preserve")
                    staticHtml += '<td class="fnt14 legalStyle">' + item.fileType + '</td>';
                else
                    staticHtml += '<td class="fnt14">' + item.fileType + '</td>';

                staticHtml += '<td class="fnt14" id=' + requestStatusID + '><div class="status-report status-report  custom_color" style="background-color:' + item.status_Code + '">' + item.status + '</div></td>';


                staticHtml += '</tr>';
                html += '</tr>';
            });
            if (totalCount == 0) {
                html += '<tr>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td style="color:red;">No Record(s) Found!</td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '</tr>';

                staticHtml += '<tr>';
                staticHtml += '<td></td>';
                staticHtml += '<td style="Visibility:hidden">No Record(s) Found!</td>';
                staticHtml += '<td></td>';
                staticHtml += '</tr>';
            }

            if (ChartType == 1) {

                $('#MyRequest_Table').show();
                $('#MyRequest_Static_Table').show();
                $('#FileType_Table').hide();
                $('#FileType_Static_Table').hide();
                $('#MyRequest_Table_Data').html(unescape(escape(html)));
                $('#MyRequest_Table_Static_Data').html(unescape(escape(staticHtml)));
                $('#MyRequest_Table_Data tr').on('click', 'td', function () {
                    //window.location.href = "/Journalist/GetJournalistDetails?JournalistID=" + $(this).closest('tr').attr('id') + '&isFromDashboard=true';
                    window.location.href = "/Request/CreateRequest?page=Detail&requestID=" + $(this).closest('tr').attr('id') + '&requestType_ID=' + + $(this).closest('tr').attr('reqtype') + '&pageType=' + 1 + '&status=' + $(this).closest('tr').attr('val') + '&IsFromDashboard=true'
                });
            }
            else {
                $('#MyRequest_Table').hide();
                $('#MyRequest_Static_Table').hide();
                $('#FileType_Table').show();
                $('#FileType_Static_Table').show();
                $('#FileType_Table_Data').html(unescape(escape(html)));
                $('#FileType_Table_Static_Data').html(unescape(escape(staticHtml)));
                $('#FileType_Table_Data tr').on('click', 'td', function () {
                    window.location.href = "/Request/CreateRequest?page=Detail&requestID=" + $(this).closest('tr').attr('id') + '&requestType_ID=' + + $(this).closest('tr').attr('reqtype') + '&pageType=' + 1 + '&status=' + $(this).closest('tr').attr('val') + '&IsFromDashboard=true'
                });
            }

            $('#pageEntry').html(unescape(escape('Showing 10 of ' + result.totalCount + ' entries')));
            if (totalCount != 0) {

                var pagination = '';

                pagination += '<ul class="pagination pagg_align">';
                pagination += '<li class="page-item"><a class="page-link" onclick=GetConnectionList(' + 1 + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ') ><span style="font-weight:bold"> << </span> </a></li>';
                if (Page == 1) {
                    pagination += '<li class="page-item"><a class="page-link" disabled> Prev</a></li>';
                }
                else {
                    var pageNumber = Page - 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick= GetConnectionList(' + pageNumber + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ')> Prev</a></li>';
                }

                var lastPage = (Math.floor(totalCount / Limit) + 1);
                if (Math.floor(totalCount % Limit) != 0) {
                    lastPage = (Math.floor(totalCount / Limit) + 1);
                }
                else {
                    lastPage = (Math.floor(totalCount / Limit));
                }
                for (pageSize = (Page - 1); (pageSize < (Page + 4) && pageSize != lastPage); pageSize++) {
                    if (Page == pageSize) {
                        pagination += '<li class="page-item"><a class="page-link active">' + pageSize + '</a></li >';
                    }
                    else if (pageSize != 0) {
                        pagination += '<li class="page-item"><a class="page-link" onclick = GetConnectionList(' + pageSize + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ')>' + pageSize + '</a></li >';
                    }
                }

                // var lastPage = (Math.floor(totalCount / Limit) + 1);

                if (Page == lastPage) {
                    pagination += '<li class="page-item"><a class="page-link active">' + lastPage + '</a></li >';
                }
                else {
                    if (lastPage - Page >= 5) {
                        pagination += '<li class="page-item"><a class="page-link">....</a></li >';
                    }
                    pagination += '<li class="page-item"><a class="page-link" onclick =  GetConnectionList(' + lastPage + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ')>' + lastPage + '</a></li >';
                }

                if (Page == (Math.floor(totalCount / Limit) + 1)) {
                    pagination += '<li class="page-item"><a class="page-link" disabled>Next </a></li >';
                }
                else {
                    var pageNumber = Page + 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick= GetConnectionList(' + pageNumber + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ')>Next </a></li >';
                }
                pagination += '<li class="page-item"><a class="page-link" onclick=GetConnectionList(' + lastPage + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ') ><span style="font-weight:bold"> >> </span> </a></li>';
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


function GetFirstConnectionList(Page, ID, fileType, Name, ChartType, tab) {
    var Limit = 10;

    StatusID = ID;
    IsLegal = fileType;
    currentTitle = Name;
    currentChart = ChartType;
    if (Name != 0) {
        StatusName = Name + " " + "Requests";
    }
    $('#StatusName').html(unescape(escape(StatusName)));

    if (ChartType == 1) {
        StatusID = ID;
        IsLegal = fileType;
    }
    else {
        StatusID = ID;
        IsLegal = fileType;
    }

    var html = '';
    var staticHtml = '';
    var sNo = ((Page - 1) * Limit);
    var totalCount = requestTotalCount;
    var requestStatusID = 0;
    var reqType = 0;

    $.each(requestList, function (key, item) {
        sNo += 1;
        requestStatusID = item.status_ID;
        reqType = item.requestType_ID;

        /*html += '<tr id=' + item.request_ID + '>';*/
        html += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + '>';
        staticHtml += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + '>';
        html += '<th scope="row" class="fnt14">' + sNo + '</td>';
        html += '<td class="fnt14">' + item.request_ID + '</td>';
        html += '<td class="fnt14">' + item.createdDate_Formatted + '</td>';
        html += '<td class="fnt14">' + item.engagement_Manager + '</td>';
        html += '<td class="fnt14">' + item.engagement_Partner + '</td>';
        html += '<td class="fnt14">' + item.entity_Name + '</td>';
        html += '<td class="fnt14">' + item.vendor_Name + '</td>';
        html += '<td class="fnt14">' + item.requestType + '</td>';
        html += '<td class="fnt14">' + item.requester_Name + '</td>';
        html += '<td class="fnt14">' + item.approved_By + '</td>';
        html += '<td class="fnt14">' + item.approverDesignation + '</td>';
        if (item.approved_By != null && item.approved_By != "") {
            html += '<td class="fnt14">' + item.lastRequestApproval + '</td>';
        }
        else {
            html += '<td class="fnt14"></td>';
        }

        html += '<td>'
        html += '<a href="/Request/AuditHistory?requestID=' + item.request_ID + '&requesrType_ID=' + item.requestType_ID + '&Pagetype=' + 1 + '&IsFromDashboard=true' + '">'
        html += '<span class="icon-Audit-history icon-weight" style="color:black;font-size: 15px !important;"></span>'
        html += '</a>'
        html += '</td>'

        if (item.is_Government_Client == 1) {
            staticHtml += '<td class="fnt14 governmentClientStyle">' + item.client_Name + '</td>';
        }
        else {
            staticHtml += '<td class="fnt14">' + item.client_Name + '</td>';
        }

        if (item.fileType == "Preserve")
            staticHtml += '<td class="fnt14 legalStyle">' + item.fileType + '</td>';
        else
            staticHtml += '<td class="fnt14">' + item.fileType + '</td>';

        staticHtml += '<td class="fnt14" id=' + requestStatusID + '><div class="status-report status-report  custom_color" style="background-color:' + item.status_Code + '">' + item.status + '</div></td>';


        staticHtml += '</tr>';
        html += '</tr>';
    });
    if (totalCount == 0) {
        html += '<tr>';
        html += '<td></td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '<td style="color:red;">No Record(s) Found!</td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '</tr>';

        staticHtml += '<tr>';
        staticHtml += '<td></td>';
        staticHtml += '<td style="Visibility:hidden">No Record(s) Found!</td>';
        staticHtml += '<td></td>';
        staticHtml += '</tr>';
    }

    if (ChartType == 1) {

        $('#MyRequest_Table').show();
        $('#MyRequest_Static_Table').show();
        $('#FileType_Table').hide();
        $('#FileType_Static_Table').hide();
        $('#MyRequest_Table_Data').html(html);
        $('#MyRequest_Table_Static_Data').html(staticHtml);
        $('#MyRequest_Table_Data tr').on('click', 'td', function () {
            //window.location.href = "/Journalist/GetJournalistDetails?JournalistID=" + $(this).closest('tr').attr('id') + '&isFromDashboard=true';
            window.location.href = "/Request/CreateRequest?page=Detail&requestID=" + $(this).closest('tr').attr('id') + '&requestType_ID=' + + $(this).closest('tr').attr('reqtype') + '&pageType=' + 1 + '&status=' + $(this).closest('tr').attr('val') + '&IsFromDashboard=true'
        });
    }
    else {
        $('#MyRequest_Table').hide();
        $('#MyRequest_Static_Table').hide();
        $('#FileType_Table').show();
        $('#FileType_Static_Table').show();
        $('#FileType_Table_Data').html(html);
        $('#FileType_Table_Static_Data').html(staticHtml);
        $('#FileType_Table_Data tr').on('click', 'td', function () {
            window.location.href = "/Request/CreateRequest?page=Detail&requestID=" + $(this).closest('tr').attr('id') + '&requestType_ID=' + + $(this).closest('tr').attr('reqtype') + '&pageType=' + 1 + '&status=' + $(this).closest('tr').attr('val') + '&IsFromDashboard=true'
        });
    }

    $('#pageEntry').html(unescape(escape('Showing 10 of ' + requestTotalCount + ' entries')));
    if (totalCount != 0) {

        var pagination = '';

        pagination += '<ul class="pagination pagg_align">';
        pagination += '<li class="page-item"><a class="page-link" onclick=GetConnectionList(' + 1 + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ') ><span style="font-weight:bold"> << </span> </a></li>';
        if (Page == 1) {
            pagination += '<li class="page-item"><a class="page-link" disabled> Prev</a></li>';
        }
        else {
            var pageNumber = Page - 1;
            pagination += '<li class="page-item"><a class="page-link" onclick= GetConnectionList(' + pageNumber + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ')> Prev</a></li>';
        }

        var lastPage = (Math.floor(totalCount / Limit) + 1);
        if (Math.floor(totalCount % Limit) != 0) {
            lastPage = (Math.floor(totalCount / Limit) + 1);
        }
        else {
            lastPage = (Math.floor(totalCount / Limit));
        }
        for (pageSize = (Page - 1); (pageSize < (Page + 4) && pageSize != lastPage); pageSize++) {
            if (Page == pageSize) {
                pagination += '<li class="page-item"><a class="page-link active">' + pageSize + '</a></li >';
            }
            else if (pageSize != 0) {
                pagination += '<li class="page-item"><a class="page-link" onclick = GetConnectionList(' + pageSize + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ')>' + pageSize + '</a></li >';
            }
        }

        // var lastPage = (Math.floor(totalCount / Limit) + 1);

        if (Page == lastPage) {
            pagination += '<li class="page-item"><a class="page-link active">' + lastPage + '</a></li >';
        }
        else {
            if (lastPage - Page >= 5) {
                pagination += '<li class="page-item"><a class="page-link">....</a></li >';
            }
            pagination += '<li class="page-item"><a class="page-link" onclick =  GetConnectionList(' + lastPage + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ')>' + lastPage + '</a></li >';
        }

        if (Page == (Math.floor(totalCount / Limit) + 1)) {
            pagination += '<li class="page-item"><a class="page-link" disabled>Next </a></li >';
        }
        else {
            var pageNumber = Page + 1;
            pagination += '<li class="page-item"><a class="page-link" onclick= GetConnectionList(' + pageNumber + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ')>Next </a></li >';
        }
        pagination += '<li class="page-item"><a class="page-link" onclick=GetConnectionList(' + lastPage + ',' + ID + ',' + fileType + ',' + 0 + ',' + ChartType + ',' + tab + ') ><span style="font-weight:bold"> >> </span> </a></li>';
        pagination += '</ul>';
        $('.pagination_page').html(pagination);
    }
    else {
        $('.pagination_page').html('');
    }
}

function Search() {
    GetConnectionList(1, StatusID, IsLegal, 0, currentChart, currentWidgetType);
}

function sortTable(sortData) {
    if (Order == "ASC" && PreviousSort == sortData) {
        Order = "DESC"
    }
    else {
        Order = "ASC"
    }
    sort = sortData;
    PreviousSort = sort;
    //GetConnectionList(1, connection, fileType, label, ChartType);
    GetConnectionList(1, StatusID, 0, 0, currentChart, currentWidgetType);
}

function SearchFileType() {
    GetConnectionList(1, 0, IsLegal, 0, currentChart, currentWidgetType);
}

function sortTableFileType(sortData) {
    if (Order == "ASC" && PreviousSort == sortData) {
        Order = "DESC"
    }
    else {
        Order = "ASC"
    }
    sort = sortData;
    PreviousSort = sort;
    //GetConnectionList(1, connection, fileType, label, ChartType);
    GetConnectionList(1, 0, IsLegal, 0, currentChart, currentWidgetType);
}

function loadHistoricalChart() {

    var connectionID = [];
    var xValues = [];
    var yValues = [];
    var barColors = [];

    $.ajax({
        url: '/Dashboard/GetHistoricalChartData',
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Show full page LoadingOverlay
            $('#loaders_1').show();
        },
        success: function (result) {
            var html = '';
            var count = 0;
            var totalConnects = 0;
            //requestTotalCount = result.requestTotalCount;
            //requestList = result.historicalRequests;

            html += '<br/>'
            html += '<center>'
            html += '<table>'
            html += '<tr>'
            $.each(result.chart_Data, function (key, item) {
                count += 1;
                connectionID.push(item.status_ID);
                xValues.push(item.status_Name);
                yValues.push(item.count);
                barColors.push(item.color);
                totalConnects += item.count;
                var name = "'".concat(item.status_Name);
                var fullName = name.concat("'");
                if ((count - 1) % 2 == 0 && count >= 2) {
                    html += '</tr><tr>'
                }
                html += '<td class="fnt14 d-flex">';
                html += '<div class="status-one" style="border-radius:50%;background-color:' + item.color + '"></div>';
                html += '<th style="cursor: pointer;color:gray;padding-bottom:.5rem" onclick="GetHistoricalConnectionList(' + 1 + ',' + item.status_ID + ',' + fullName + ')">' + item.status_Name + '&nbsp; -  ' + item.count + '</th>';
                html += '</td>';
                html += '<td>&nbsp;&nbsp;</td>';
            });
            html += '</tr>';
            html += '</table>';
            html += '</center>'

            $('#historical_chart_labels').html(unescape(escape(html)));

            Chart.pluginService.register({
                beforeDraw: function (chart) {
                    var width = chart.chart.width,
                        height = chart.chart.height,
                        ctx = chart.chart.ctx;
                    ctx.restore();
                    var fontSize = (height / 114).toFixed(2);
                    ctx.font = "30px Helvetica Neue";
                    ctx.textBaseline = "middle";
                    var text = chart.config.options.elements.center.text,
                        textX = Math.round((width - ctx.measureText(text).width) / 2),
                        textY = height / 2;
                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            });

            if (totalConnects != 0) {
                var myNewChart = new Chart("historicalDatas", {
                    type: "doughnut",
                    data: {
                        datasets: [{
                            backgroundColor: barColors,
                            data: yValues,
                            id: connectionID
                        }],
                        labels: xValues,
                        borderWidth: 50,
                        hoverBorderColor: barColors,
                        hoverOffset: 0
                    },
                    options: {
                        cutoutPercentage: 90,
                        dataLabels: {
                            enabled: false
                        },
                        elements: {
                            center: {
                                text: totalConnects
                            }
                        },
                        hover: {
                            onHover: function (e) {
                                $("#historicalDatas").css("cursor", e[0] ? "pointer" : "default");
                            }
                        },
                        legend: {
                            animation: {
                                animateScale: true,
                                animateRotate: true
                            },
                            position: 'bottom',
                            display: false,
                        }
                    }
                });
            }
            else {
                var myNewChart = new Chart("historicalDatas", {
                    type: "doughnut",
                    data: {
                        datasets: [{
                            backgroundColor: ['#DEDEDE'],
                            data: ['100'],
                            id: ['0']
                        }],
                        labels: ['No Request'],
                        borderWidth: 50,
                        hoverBorderColor: barColors,
                        hoverOffset: 0
                    },
                    options: {
                        cutoutPercentage: 90,
                        dataLabels: {
                            enabled: false
                        },
                        elements: {
                            center: {
                                text: totalConnects
                            }
                        },
                        hover: {
                            onHover: function (e) {
                                $("#historicalDatas").css("cursor", e[0] ? "pointer" : "default");
                            }
                        },
                        legend: {
                            animation: {
                                animateScale: true,
                                animateRotate: true
                            },
                            position: 'bottom',
                            display: false,
                        }
                    }
                });
            }

            //var addRadiusMargin = 10;
            if (totalConnects != 0) {
                var canvas = document.getElementById("historicalDatas");
                canvas.onclick = function (evt) {
                    var activePoints = myNewChart.getElementsAtEvent(evt);
                    if (activePoints[0]) {
                        var chartData = activePoints[0]['_chart'].config.data;
                        var idx = activePoints[0]['_index'];

                        var label = chartData.labels[idx];
                        var value = chartData.datasets[0].data[idx];
                        var connection = chartData.datasets[0].id[idx];
                        var fileType = 10;

                        GetHistoricalConnectionList(1, connection, label);
                    }
                };
            }
            GetHistoricalConnectionList(1, 1, 'Pending');

            $('#loaders_1').hide();
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function GetHistoricalConnectionList(page, ID, Name) {
    var limit = 10;

    StatusID = ID;
    currentTitle = Name;
    if (Name != 0) {
        StatusName = Name + " " + "Requests";
    }

    var filterStatus = "Pending";
    if (ID == 2) {
        filterStatus = "Assigned";
    }
    else if (ID == 3) {
        filterStatus = "Completed";
    }

    $('#HistoricalStatusName').html(unescape(escape(StatusName)));

    var requestInp = {
        search_Historical_ID: $('#search_Historical_ID').val(),
        search_Archival_Location: $('#search_Archival_Location').val(),
        search_Vendor: $('#search_Vendor').val(),
        search_Container_Code: $('#search_Container_Code').val(),
        search_Code: $('#search_Code').val(),
        search_LOS: $('#search_LOS').val(),
        search_SBU: $('#search_SBU').val(),
        search_Add_Date: $('#search_Add_Date').val(),
        search_From_Date: $('#search_From_Date').val(),
        search_To_Date: $('#search_To_Date').val(),
        search_Status_Date: $('#search_Status_Date').val(),
        search_Department: $('#search_Department').val(),
        search_Description: $('#search_Description').val(),
        search_Item_Status: $('#search_Item_Status').val(),
        search_Account_Code: $('#search_Account_Code').val(),
        search_Account_Description: $('#search_Account_Description').val(),
        search_Branch: $('#search_Branch').val(),
        search_Field_17: $('#search_Field_17').val(),
        search_Field_18: $('#search_Field_18').val(),
        search_Field_19: $('#search_Field_19').val(),
        search_Field_20: $('#search_Field_20').val(),
        search_Field_21: $('#search_Field_21').val(),
        search_Field_22: $('#search_Field_22').val(),
        search_Field_23: $('#search_Field_23').val(),
        search_Field_24: $('#search_Field_24').val(),
        search_Field_25: $('#search_Field_25').val(),
        search_Field_26: $('#search_Field_26').val(),
        search_Field_27: $('#search_Field_27').val(),
        search_Field_28: $('#search_Field_28').val(),
        search_Field_29: $('#search_Field_29').val(),
        search_Comments: $('#search_Comments').val(),
        search_Request_ID: $('#search_Request_ID').val(),
        search_Historical_Status: $('#search_Historical_Status').val(),
        fltrLos: $('#fltrLos').val(),
        fltrSbu: $('#fltrSbu').val(),
        fltrdepartment: $('#fltrdepart').val(),
        fltrBranch: $('#fltrBranch').val(),
        fltrContainerCode: $('#fltrContainerCode').val(),
        fltrHistorical_Status: filterStatus,
        pageType: $('#pageType').val(),
        page: page,
        limit: limit,
        sort: sort,
        order: Order,
    }

    var data = new FormData();
    data.append("RequestInput", JSON.stringify(requestInp));
    data.append('__RequestVerificationToken', token);

    $.ajax({
        url: '/Historical/GetHistoricalRequestList',
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
            var staticHtml = '';
            var historical_Status_ID = 0;
            var sNo = ((page - 1) * limit);
            var totalCount = result.totalCount

            $.each(result.historical_Requests, function (key, item) {
                sNo += 1;
                historical_Status_ID = item.historical_Status_ID;
                html += '<tr id=' + item.historical_ID + ' historicalStatusid=' + historical_Status_ID + '>';
                html += '<th scope="row" class="fnt14">' + sNo + '</td>';
                html += '<td class="fnt14">' + item.historical_ID + '</td>';
                if (item.archival_Location != null && item.archival_Location != "") {
                    html += '<td class="fnt14">' + item.archival_Location + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.vendor != null && item.vendor != "") {
                    html += '<td class="fnt14">' + item.vendor + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.container_Code != null && item.container_Code != "") {
                    html += '<td class="fnt14">' + item.container_Code + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.code != null && item.code != "") {
                    html += '<td class="fnt14"><div class="status-report status-report custom_color" style="background-color:transparent">' + item.code + '</td>';
                }
                else {
                    html += '<td class="fnt14"><div class="status-report status-report custom_color" style="background-color:transparent"></td>';
                }
                if (item.los != null && item.los != "") {
                    html += '<td class="fnt14">' + item.los + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.sbu != null && item.sbu != "") {
                    html += '<td class="fnt14">' + item.sbu + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.add_Date != null && item.add_Date != "") {
                    html += '<td class="fnt14">' + item.add_Date + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.from_Date != null && item.from_Date != "") {
                    html += '<td class="fnt14">' + item.from_Date + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.to_Date != null && item.to_Date != "") {
                    html += '<td class="fnt14">' + item.to_Date + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.status_Date != null && item.status_Date != "") {
                    html += '<td class="fnt14">' + item.status_Date + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.department != null && item.department != "") {
                    html += '<td class="fnt14">' + item.department + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.description != null && item.description != "") {
                    html += '<td class="fnt14">' + item.description + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.account_Code != null && item.account_Code != "") {
                    html += '<td class="fnt14">' + item.account_Code + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.account_Description != null && item.account_Description != "") {
                    html += '<td class="fnt14">' + item.account_Description + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.branch != null && item.branch != "") {
                    html += '<td class="fnt14">' + item.branch + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_17 != null && item.field_17 != "") {
                    html += '<td class="fnt14">' + item.field_17 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_18 != null && item.field_18 != "") {
                    html += '<td class="fnt14">' + item.field_18 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_19 != null && item.field_19 != "") {
                    html += '<td class="fnt14">' + item.field_19 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_20 != null && item.field_20 != "") {
                    html += '<td class="fnt14">' + item.field_20 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_21 != null && item.field_21 != "") {
                    html += '<td class="fnt14">' + item.field_21 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_22 != null && item.field_22 != "") {
                    html += '<td class="fnt14">' + item.field_22 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_23 != null && item.field_23 != "") {
                    html += '<td class="fnt14">' + item.field_23 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_24 != null && item.field_24 != "") {
                    html += '<td class="fnt14">' + item.field_24 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_25 != null && item.field_25 != "") {
                    html += '<td class="fnt14">' + item.field_25 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_26 != null && item.field_26 != "") {
                    html += '<td class="fnt14">' + item.field_26 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_27 != null && item.field_27 != "") {
                    html += '<td class="fnt14">' + item.field_27 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_28 != null && item.field_28 != "") {
                    html += '<td class="fnt14">' + item.field_28 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
                if (item.field_29 != null && item.field_29 != "") {
                    html += '<td class="fnt14">' + item.field_29 + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }

                //html += '<td class="fnt14">' + item.comments + '</td>';
                html += '</tr>';

                staticHtml += '<tr id=' + item.historical_ID + ' historicalStatusid=' + historical_Status_ID + '>';
                if (item.item_Status != null && item.item_Status != "") {
                    staticHtml += '<td class="fnt14">' + item.item_Status + '</td>';
                }
                else {
                    staticHtml += '<td class="fnt14"></td>';
                }
                if (item.historical_Status != null && item.historical_Status != "") {
                    staticHtml += '<td class="fnt14"><div class="status-report status-report  custom_color" style="background-color:' + item.historical_StatusCode + '">' + item.historical_Status + '</div></td>';
                }
                else {
                    staticHtml += '<td class="fnt14"></td>';
                }
                if (item.request_ID == 0) {
                    staticHtml += '<td class="fnt14"></td>';
                }
                else {
                    staticHtml += '<td class="fnt14">' + item.request_ID + '</td>';
                }
                //staticHtml += '<th style="padding-top: 6px !important;padding-bottom: 4px !important;">'
                //staticHtml += '<div class="dropdown">'
                //staticHtml += '<button class="btn bg-transparent fnt16 font-weight-bold" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ... </button>'
                //staticHtml += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                //staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.historical_ID + ')" > Edit </a>'
                //staticHtml += '</div >'
                //staticHtml += '</div>'
                //staticHtml += '</th>'
                //staticHtml += '<td style="cursor:pointer" href = "#" onclick="redirectEditPage(' + item.historical_ID + ')"><div class="text-center"><img src="img/edit.png"></div></td>';

                staticHtml += '</tr>';
            });
            if (totalCount == 0) {
                html += '<tr>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td style="color:red;">No Record(s) Found!</td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '<td></td>';
                html += '</tr>';

                staticHtml += '<tr>';
                staticHtml += '<td style="Visibility:hidden">No Record(s) Found!</td>';
                staticHtml += '</tr>';
            }
            $('#Historical_Request_Table').html(html);
            $('#Historical_Request_Table_Static_Data').html(staticHtml);
            if (totalCount != 0) {
                $('tbody tr').on('click', 'td', function () {
                    //window.location.href = "/Request/CreateRequest?page=HistoricalDetail&historicalID=" + $(this).closest('tr').attr('id');

                    window.location.href = "/Historical/HistoricalDetailsView?page=Dashboard&historicalID=" + $(this).closest('tr').attr('id') + '&pageType=9&historicalStatus=' + $(this).closest('tr').attr('historicalStatusid')
                });
                var pagination = '';

                pagination += '<ul class="pagination pagg_align">';
                pagination += '<li class="page-item"><a class="page-link" onclick=GetHistoricalConnectionList(' + 1 + ',' + ID + ',' + 0 + ') ><span style="font-weight:bold"> << </spa> </a></li>';

                if (page == 1) {
                    pagination += '<li class="page-item"><a class="page-link" disabled> Prev</a></li>';
                }
                else {
                    var pageNumber = page - 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick=GetHistoricalConnectionList(' + pageNumber + ',' + ID + ',' + 0 + ')> Prev</a></li>';
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
                        pagination += '<li class="page-item"><a class="page-link" onclick = GetHistoricalConnectionList(' + pageSize + ',' + ID + ',' + 0 + ')>' + pageSize + '</a></li >';
                    }
                }
                if (page == lastPage) {
                    pagination += '<li class="page-item"><a class="page-link active">' + lastPage + '</a></li >';
                }
                else {
                    if (lastPage - page >= 5) {
                        pagination += '<li class="page-item"><a class="page-link">....</a></li >';
                    }
                    pagination += '<li class="page-item"><a class="page-link" onclick =  GetHistoricalConnectionList(' + lastPage + ',' + ID + ',' + 0 + ')>' + lastPage + '</a></li >';
                }
                if (page == lastPage) {
                    pagination += '<li class="page-item"><a class="page-link" disabled>Next </a></li >';
                }
                else {
                    var pageNumber = page + 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick=GetHistoricalConnectionList(' + pageNumber + ',' + ID + ',' + 0 + ')>Next </a></li >';
                }
                pagination += '<li class="page-item"><a class="page-link" onclick=GetHistoricalConnectionList(' + lastPage + ',' + ID + ',' + 0 + ') ><span style="font-weight:bold"> >> </spa> </a></li>';

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

function HistoricalSearch() {
    GetHistoricalConnectionList(1, StatusID, 0);
}

function sortHistoricalTable(sortData) {
    if (Order == "ASC" && PreviousSort == sortData) {
        Order = "DESC"
    }
    else {
        Order = "ASC"
    }
    sort = sortData;
    PreviousSort = sort;
    GetHistoricalConnectionList(1, StatusID, 0);
}