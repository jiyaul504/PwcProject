var pageSize = 1;
var order = "";
var sort = "";
var previousSort = "";
var actionBy = "";
var IsvalidImg = true;
var requestId = 0;
var selectedLos = "";
var selectedSbu = "";
var selectedPartner = "";
var selectedManager = "";
var selectedLocation = "";
var selectedEntity = "";
var losCode = "";
var los = "";
var sbuCode = "";
var sbu = "";
var deleteRequestID = "";
var deleteRequestTypeID = "";
var pageType = 0;
var userRoleID = "";
var isSuperAdmin = "";
var Selected_list = [];
var R_Selected_list = [];
var BulkUpdateList = [];
var totalCount = 0;
var selectedFC = 0;
var IsGovernmentClientFilter = 0;
var designationID = "";
var form = $('#__AjaxAntiForgeryForm');
var token = $('input[name="__RequestVerificationToken"]', form).val();


$(document).ready(function () {
    PWCfims.filtercollapse();
    PWCfims.status();

    $('.container-scroll').perfectScrollbar({
        useBothWheelAxes: false,
        suppressScrollY: true
    });

    selectedLos = $('#filterLOSCode').val();
    selectedSbu = $('#filterSBUCode').val();

    pageType = $('#pageType').val();
    actionBy = $('#Action_By').val();
    los = $('#User_LOS').val();
    losCode = $('#User_LOS_Code').val();
    sbu = $('#User_SBU').val();
    sbuCode = $('#User_SBU_Code').val();
    userRoleID = $('#User_Role_ID').val();
    isSuperAdmin = $('#IsSuperAdmin').val();
    designationID = $('#Designation_ID').val();
    if ($('#User_Role').val() == "SuperAdmin" || userRoleID == 7) {
        $('#Los').attr('disabled', false);
        $('#sbu').attr('disabled', false);
        $('#Los').val("");
        $('#sbu').val("");
        losCode = "";
        sbuCode = "";
        GetLos();
        //GetSBU();
    }
    //else if (userRoleID == 7 && $('#pageType').val() != 2) {
    //    los = $('#User_LOS').val();
    //    losCode = $('#User_LOS_Code').val();
    //    sbu = $('#User_SBU').val();
    //    sbuCode = $('#User_SBU_Code').val();
    //    selectedLos = losCode;
    //    selectedSbu = sbuCode;
    //    $('#Los').val(los);
    //    $('#sbu').val(sbu);
    //    $('#Los').attr('disabled', true);
    //    $('#sbu').attr('disabled', true);
    //    // GetUsers();
    //}
    loadData(1);
    if ($('#pageType').val() != 1) {
        loadRetentionData(1);
    }
    $('#dispose_Footer').hide();
    GetEngagementManager();
    GetEngagementPartner();
    GetLocation();
    //GetLos();
    GetStatus();
    GetRequestType();
    SetDate();
    //GetFileCoordinator();
    GetEntityName();

    $('#select_all').on('click', function () {
        if (this.checked) {
         //   Selected_list = [];
           // alert(Selected_list);
            $('.checkbox').each(function () {
                if (this.checked != true) {
                    this.checked = true;
                    Selected_list.push(parseInt($(this).val()));
                    var newList = {
                        Id: parseInt($(this).val()),
                        IsRMOGC: $(this).attr("approvertype")
                    }
                    BulkUpdateList.push(newList);
                }
               
                if (Selected_list.length > 0) {
                    $('#holdbtn').css("display", "block");
                    $('#rejectbtn').css("display", "block");
                    $('#approvebtn').css("display", "block");
                }
                if ($('#fltrStatus').val() == "4") {
                    $('#holdbtn').css("display", "none");
                }
                else {
                    $('#holdbtn').css("display", "block");
                }
            });
        } else {
            $('.checkbox').each(function () {
                this.checked = false;
                //Selected_list = [];
                //BulkUpdateList = [];
              //  alert("before Deselect:" + Selected_list);
                var newList = {
                    Id: parseInt($(this).val()),
                    IsRMOGC: $(this).attr("approvertype")
                }
                BulkUpdateList.pop(newList);
                Selected_list.pop(parseInt($(this).val()));
               //alert("after Deselect:" + Selected_list);
                //$('#holdbtn').css("display", "none");
                //$('#rejectbtn').css("display", "none");
                //$('#approvebtn').css("display", "none");
            });
        }
    });
    $('#R_select_all').prop('checked', false);
    $('#R_select_all').on('click', function () {
        if (this.checked) {
           // R_Selected_list = [];
            $('.R_checkbox').each(function () {
                if (this.checked != true) {
                this.checked = true;
                R_Selected_list.push(parseInt($(this).val()));
                }
                if (R_Selected_list.length > 0) {
                    $('#disposebtn').attr("disabled", false);
                }
            });
        } else {
            $('.R_checkbox').each(function () {
                this.checked = false;
               // R_Selected_list = [];
                R_Selected_list.pop(parseInt($(this).val()));
                $('#disposebtn').attr("disabled", true);
            });
        }
    });


});

var PWCfims = (function () {
    function filtercollapse() {
        $(document).on('click', '[data-toggle = "collapse"]', function () {
            collapse();
        });

        $(document).on('click', '.filter-item', function (event) {
            var newfilterid = event.currentTarget.id;
            debugger;
            $(this).parent().parent().children().closest('.filter-collapse').children().next().attr('href', "#filter-" + newfilterid);
        });
    }

    function status() {
        //const slidePage = document.querySelector(".slide-page");
        //const nextBtnFirst = document.querySelector(".firstNext");
        //const prevBtnSec = document.querySelector(".prev-1");
        //const nextBtnSec = document.querySelector(".next-1");
        //const prevBtnThird = document.querySelector(".prev-2");
        //const nextBtnThird = document.querySelector(".next-2");
        //const nextBtnFour = document.querySelector(".next-3");
        //const prevBtnFourth = document.querySelector(".prev-3");
        //const submitBtn = document.querySelector(".submit");
        //const progressText = document.querySelectorAll(".step p");
        //const progressCheck = document.querySelectorAll(".step .check");
        //const bullet = document.querySelectorAll(".step .bullet");

        //document.querySelector(".slide-2").style.display = "none";
        //document.querySelector(".slide-3").style.display = "none";
        //document.querySelector(".slide-4").style.display = "none";
        //document.querySelector(".slide-5").style.display = "none";

        //let current = 1;

        //nextBtnFirst.addEventListener("click", function (event) {
        //    event.preventDefault();
        //    slidePage.style.width = "3%";
        //    document.querySelector(".slide-2").style.display = "block";
        //    bullet[current - 1].classList.add("active");
        //    progressCheck[current - 1].classList.add("active");
        //    progressText[current - 1].classList.add("active");
        //    current += 1;
        //});

        //nextBtnSec.addEventListener("click", function (event) {
        //    event.preventDefault();

        //    document.querySelector(".slide-3").style.display = "block";
        //    document.querySelector(".slide-2").style.width = "3%";
        //    bullet[current - 1].classList.add("active");
        //    progressCheck[current - 1].classList.add("active");
        //    progressText[current - 1].classList.add("active");
        //    current += 1;
        //});

        //nextBtnThird.addEventListener("click", function (event) {
        //    event.preventDefault();
        //    document.querySelector(".slide-4").style.display = "block";
        //    document.querySelector(".slide-3").style.width = "3%";
        //    bullet[current - 1].classList.add("active");
        //    progressCheck[current - 1].classList.add("active");
        //    progressText[current - 1].classList.add("active");
        //    current += 1;
        //});

        //nextBtnFour.addEventListener("click", function (event) {
        //    event.preventDefault();
        //    document.querySelector(".slide-5").style.display = "block";
        //    document.querySelector(".slide-4").style.width = "3%";
        //    bullet[current - 1].classList.add("active");
        //    progressCheck[current - 1].classList.add("active");
        //    progressText[current - 1].classList.add("active");
        //    current += 1;
        //});
    }

    return {
        filtercollapse: filtercollapse,
        status: status
    };

})();

function GovernmentClientFilter() {
    if (document.getElementById('governmentClientCheckBox').checked) {
        IsGovernmentClientFilter = 1;
    }
    else {
        IsGovernmentClientFilter = 0;
    }
    loadData(1);
}

function loadData(page) {
    var limit = 10;

    $('#dispose_Footer').hide();
    $('#governmentClientCheckBox').val(IsGovernmentClientFilter);
    $('#IsRetention').val("No");
    var requestInp = {
        requestId: $('#requestId').val(),   
        createdDate: $('#createdDate').val(),
        createdBy: $('#createdBy').val(),
        engagementManager: $('#engagementManager').val(),
        engagementPartner: $('#engagementPartner').val(),
        clientName: $('#clientName').val(),
        entityName: $('#entityName').val(),
        fileType: $('#fileType').val(),
        requestType: $('#requestType').val(),
        status: $('#status').val(),
        approverName: $('#approverName').val(),
        approverDesignation: $('#approverDesignation').val(),
        lastRequestApproval: $('#lastRequestApproval').val(),
        fltrRequestId: $('#fltrRequestId').val(),
        fltrBarcode: $('#fltrBarCode').val(),
        fltrContainercode: $('#fltrContainer').val(),
        fltrFilecode: $('#fltrFile').val(),
        fltrengPartner: selectedPartner,
        fltrengManager: selectedManager,
        fltrLocation: selectedLocation,
        fltrLos: selectedLos,
        fltrSbu: selectedSbu,
        fltrProjectCode: $('#fltrProject').val(),
        fltrStatus: $('#fltrStatus').val(),
        fltrFileType: $('#fltrFileType').val(),
        fltrReqType: $('#fltrReqType').val(),
        pageType: $('#pageType').val(),
        fltrclient: $('#fltrclient').val(),
        fltrentity: selectedEntity,
        Is_Government_Client: IsGovernmentClientFilter,
        page: page,
        limit: limit,
        sort: sort,
        order: order,
        redirectionFltrStatusID: $('#filterStatusID').val(),
    }
    var data = new FormData();
    data.append("RequestInput", JSON.stringify(requestInp));
    data.append('__RequestVerificationToken', token);
    $.ajax({
        url: '/Request/GetRequestList',
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
            var sNo = ((page - 1) * limit);
            totalCount = result.totalCount
            if (Selected_list.length == totalCount) {
                $('#select_all').prop('checked', true);
            }
            else {
                $('#select_all').prop('checked', false);
            }
            var requestStatusID = 0;
            var reqType = 0;
            var isBlanket = 0;
            if (Selected_list.length > 0) {
                    $('#holdbtn').css("display", "block");
                    $('#rejectbtn').css("display", "block");
                    $('#approvebtn').css("display", "block");
                }
            else {
                $('#holdbtn').css("display", "none");
                $('#rejectbtn').css("display", "none");
                $('#approvebtn').css("display", "none");
            }
            if ($('#fltrStatus').val() == "4") {
                $('#holdbtn').css("display", "none");
            }

            $.each(result.requests, function (key, item) {
                sNo += 1;
                var statusHtml = '';
                requestStatusID = item.status_ID;
                reqType = item.requestType_ID;
                isBlanketApprove = item.isBlanketApprovalRequest;
                statusHtml = '';
                html += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + ' isBlanket =' + isBlanketApprove +'>';
                staticHtml += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + ' isBlanket ' + isBlanketApprove + '>';
                if (pageType == 2 || pageType == 4 || pageType == 5) {
                    if (($('#fltrStatus').val() == "2" || $('#fltrStatus').val() == "4" || ($('#fltrStatus').val() == "12" && $('#fltrReqType').val() == 5 && designationID == 3)) && $('#fltrFileType').val() != "undefined" && $('#fltrReqType').val() != "undefined") {
                        if (Selected_list.indexOf(item.request_ID) == -1) {
                            html += '<th ><input type="checkbox" class = "checkbox" id="chk_' + item.request_ID + '" value="' + item.request_ID + '" approverType="' + item.isOGC_RQRM_Request + '" onclick="AddList(' + item.request_ID + ',' + item.isOGC_RQRM_Request + ')" /></th>';
                        }
                        else {
                            html += '<th ><input type="checkbox" class = "checkbox" id="chk_' + item.request_ID + '" value="' + item.request_ID + '" approverType="' + item.isOGC_RQRM_Request + '" onclick="AddList(' + item.request_ID + ',' + item.isOGC_RQRM_Request +')" checked/> </th>';
                        }
                        $('#select_all').attr('disabled', false);
                    }
                    else {
                        html += '<th ><input type="checkbox" class = "checkbox" id="chk_' + item.request_ID + '" value="' + item.request_ID + '" approverType="' + item.isOGC_RQRM_Request + '" onclick="AddList(' + item.request_ID + ',' + item.isOGC_RQRM_Request +')" disabled/> </th>';
                        $('#select_all').attr('disabled', true);
                    }
                }
                html += '<th scope="row" class="fnt14">' + sNo + '</th>';
                html += '<td class="fnt14">' + item.request_ID + '</td>';
                html += '<td class="fnt14">' + item.createdDate_Formatted + '</td>';
                html += '<td class="fnt14">' + item.requester_Name + '</td>';
                html += '<td class="fnt14">' + item.engagement_Manager + '</td>';
                html += '<td class="fnt14">' + item.engagement_Partner + '</td>';

                if (item.is_Government_Client == 1) {
                    html += '<td class="fnt14 governmentClientStyle">' + item.client_Name + '</td>';
                }
                else {
                    html += '<td class="fnt14">' + item.client_Name + '</td>';
                }

                html += '<td class="fnt14">' + item.entity_Name + '</td>';
                html += '<td class="fn14"><div class="status-report status-report custom_color" style="background-color:transparent">' + item.requestType + '</div></td>';
                html += '<td class="fnt14">' + item.approved_By + '</td>';
                html += '<td class="fnt14">' + item.approverDesignation + '</td>';
                if (item.approved_By != null && item.approved_By != "") {
                    html += '<td class="fnt14">' + item.lastRequestApproval + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }
               
                if (item.fileType == "Preserve")
                    staticHtml += '<td class="fnt14 legalStyle">' + item.fileType + '</td>';
                else
                    staticHtml += '<td class="fnt14">' + item.fileType + '</td>';

                //if (reqType == 5 && item.status_ID == 3) {
                //    staticHtml += '<td class="text-center" id=' + requestStatusID + '"><div class="status-report status-report white_cl custom_color" style="background-color:#E0301E">Preservation</div></td>';
                //}
                //else {
                //if (designationID == 3 && item.isBlanketApprovalRequest && item.requestType_ID == 5 && requestStatusID == 2)
                //    staticHtml += '<td class="fnt14" id=' + requestStatusID + '"><div class="status-report status-report custom_color" style="background-color:transparent">In-Progress</div></td>';
                //else
                    staticHtml += '<td class="fnt14" id=' + requestStatusID + '"><div class="status-report status-report custom_color" style="background-color:' + item.status_Code + '">' + item.status + '</div></td>';
               // }
                var contentModified = 0;

                if (item.isContentModified == true) {
                    contentModified = 1;
                }
                else {
                    contentModified = 0;
                }
                if (item.is_Historical == 1) {
                    staticHtml += '<th class="cursor text-center">'
                    staticHtml += '<span class="icon-Approver-history icon-weight" style="color:black"></span>'
                    staticHtml += '</th>'
                }
                else {
                    staticHtml += '<th class="cursor text-center" onclick="openApproverHistory(' + item.request_ID + ', ' + item.requestType_ID + ',' + item.isFilelegalHold + ',' + contentModified + ')">'
                    staticHtml += '<span class="icon-Approver-history icon-weight" style="color:black"></span>'
                    staticHtml += '</th>'
                }

                staticHtml += '<td class="text-center">'
                staticHtml += '<a href="/Request/AuditHistory?requestID=' + item.request_ID + '&requesrType_ID=' + item.requestType_ID + '&Pagetype=' + pageType + '">'
                staticHtml += '<span class="icon-Audit-history icon-weight" style="color:black"></span>'
                staticHtml += '</a>'
                staticHtml += '</td>'

                if (pageType != 2 && pageType != 4 && pageType != 5 && pageType != 6) {
                    staticHtml += '<th style="padding-top: 6px !important;padding-bottom: 4px !important;">'
                    staticHtml += '<div class="dropdown">'
                    staticHtml += '<button class="btn bg-transparent fnt16 font-weight-bold" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ... </button>'
                    if (requestStatusID == 2 || requestStatusID == 5 || requestStatusID == 6 || requestStatusID == 7 || requestStatusID == 9) {
                        staticHtml += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                        if (requestStatusID == 2) {
                            staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')" > Edit </a>'
                            if (reqType == 1 || reqType == 2 || reqType == 3 || reqType == 4) {
                                staticHtml += '<div class="dropdown-item" style="cursor:pointer" onclick = "DeleteFunction(' + item.request_ID + ','+ reqType +')" > Delete</div>'
                            }
                        }
                        else if (requestStatusID == 5) {
                            staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectUpdatePage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')" > Edit</a>'
                            staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')"> Retrieve Request </a>'
                            if (item.fileType == "Normal" && item.isRetentionCompleted) {
                                staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + 10 + ',' + reqType + ')" > Dispose Request </a>'
                            }
                        }
                        else if (requestStatusID == 6) {
                            staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectUpdatePage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')" > Edit</a>'
                            staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')"> Retrieve Request </a>'
                             if (item.fileType == "Normal" && item.isRetentionCompleted) {
                                 staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + 10 + ',' + reqType + ')" > Dispose Request </a>'
                            }
                        }
                        else if (requestStatusID == 7) {
                            staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectUpdatePage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')" > Edit</a>'
                            staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')" > Rearchive Request </a>'
                        }
                        else if (requestStatusID == 9) {
                            staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectUpdatePage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')" > Edit</a>'
                            if (reqType == 1) {
                                staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')" > Resubmit Request </a>'
                            }
                            else {
                                staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')" > Resubmit Request </a>'
                            }
                        }
                        //else if (requestStatusID == 10) {
                        //    staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectUpdatePage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')" > Edit</a>'
                        //}
                    }
                    if (requestStatusID == 3 || requestStatusID == 4 || requestStatusID == 11)
                        {
                            staticHtml += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                            staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectUpdatePage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')" > Edit</a>'
                        }
                    staticHtml += '</div >'
                    staticHtml += '</div>'
                    staticHtml += '</th>'
                }
                if (pageType == 2 && (designationID == 2 || designationID == 3) ||
                    pageType == 4 && (userRoleID == "7" || isSuperAdmin == "Yes" /*|| userRoleID == "6"*/)) {
                    staticHtml += '<th style="padding-top: 6px !important;padding-bottom: 4px !important;">'
                    staticHtml += '<div class="dropdown">'
                    staticHtml += '<button class="btn bg-transparent fnt16 font-weight-bold" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ... </button>'
                    if (requestStatusID != 10) {
                        staticHtml += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                        staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectUpdatePage(' + item.request_ID + ',' + requestStatusID + ',' + reqType + ')" > Edit</a>'
                    }

                    staticHtml += '</div >'
                    staticHtml += '</div>'
                    staticHtml += '</th>'
                }

                staticHtml += '</tr>';
                html += '</tr>';
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
                staticHtml += '<td></td>';
                staticHtml += '<td style="Visibility:hidden">No Record(s) Found!</td>';
                staticHtml += '<td></td>';
                staticHtml += '</tr>';

            }
            $('#Request_Table').html(html);
            $('#Request_Table_Static_Data').html(staticHtml);
            if (totalCount != 0) {
                $('tbody tr').on('click', 'td', function () {
                    window.location.href = "/Request/CreateRequest?page=Detail&requestID=" + $(this).closest('tr').attr('id') + '&requestType_ID=' + + $(this).closest('tr').attr('reqtype') + '&pageType=' + pageType + '&status=' + $(this).closest('tr').attr('val') + '&isBlanket=' + $(this).closest('tr').attr('isBlanket')
                });

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

function AddList(Id, approverType) {
    if (document.getElementById('chk_' + Id + '').checked) {
        Selected_list.push(Id);
        var newList = {
            Id: Id,
            IsRMOGC: approverType
        }
        BulkUpdateList.push(newList);
        if (Selected_list.length > 0) {
                $('#holdbtn').css("display", "block");
                $('#rejectbtn').css("display", "block");
                $('#approvebtn').css("display", "block");
            }
        }
    else {
        Selected_list = $.grep(Selected_list, function (value) {
            return value != Id;
        });
        var index = BulkUpdateList.findIndex(function (o) {
            return o.Id === Id;
        })
        BulkUpdateList.splice(index, 1);
    }
    if (Selected_list.length == 0) {
        $('#holdbtn').css("display", "none");
        $('#rejectbtn').css("display", "none");
        $('#approvebtn').css("display", "none");
    }
    if ($('#fltrStatus').val() == "4") {
        $('#holdbtn').css("display", "none");
    }
    if (Selected_list.length == totalCount) {
        $('#select_all').prop('checked', true);
    }
    else {
        $('#select_all').prop('checked', false);
    }
    //alert(Selected_list);
}
function Search() {
    loadData(1);
}

function RetentionSearch() {
    loadRetentionData(1);
}

function GetEngagementManager() {
    var items = [];
    $.ajax({
        url: '/Request/GetEngagementManager?losCode=' + losCode +
            '&Sbu=' + sbuCode,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                items[key] = item.fullName;
            });
            $('#EngManager').autocomplete({
                source: items,
                select: function (event, ui) {
                    var value = ui.item.value;
                    var id = '';
                    for (var i = 0; i < result.length; i++) {
                        if (value == result[i].fullName) {
                            id = result[i].id;
                            selectedManager = result[i].id;
                            break;
                        }
                    }
                    //return false;
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

function GetEngagementPartner() {
    var items = [];
    $.ajax({
        url: '/Request/GetEngagementPartner?losCode=' + losCode +
            '&Sbu=' + sbuCode,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                items[key] = item.fullName;

            });
            $('#EngPartner').autocomplete({
                source: items,
                select: function (event, ui) {
                    var value = ui.item.value;
                    var id = '';
                    for (var i = 0; i < result.length; i++) {
                        if (value == result[i].fullName) {
                            id = result[i].id;
                            selectedPartner = result[i].id;
                            break;
                        }
                    }
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

function GetLocation() {
    var items = [];
    $.ajax({
        url: '/Request/GetLocation',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                items[key] = item.name;

            });
            $('#fltrLocation').autocomplete({
                source: items,
                select: function (event, ui) {
                    var value = ui.item.value;
                    var id = '';
                    for (var i = 0; i < result.length; i++) {
                        if (value == result[i].name) {
                            id = result[i].name;
                            selectedLocation = result[i].name;
                            break;
                        }
                    }
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
                            break;
                        }
                    }
                    $("#fltrLos").val(id);
                    //var ids = $("#fltrLos").val();
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
                            break;
                        }
                    }
                    $("#fltrSbu").val(id);
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

function GetStatus() {
    $.ajax({
        url: '/Request/GetStatus',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var html = '<option value="undefined" selected>Select Status</option>';
            $.each(result, function (key, item) {
                html += '<option value="' + item.status_ID + '">' + item.status_Name + '</option>';
            });
            $('#fltrStatus').html(unescape(escape(html)));
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function GetRequestType() {
    $.ajax({
        url: '/Request/GetRequestType',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var html = '<option value="undefined" selected>Select Request Type</option>';
            $.each(result, function (key, item) {
                html += '<option value="' + item.drpId + '">' + item.name + '</option>';
            });
            $('#fltrReqType').html(unescape(escape(html)));
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function clearTextBox() {
    $('#fltrRequestId').val("");
    $('#fltrBarCode').val("");
    $('#fltrContainer').val("");
    $('#fltrFile').val("");
    $('#fltrEngPartner').val("");
    $('#fltrEngManager').val("");
    $('#fltrLocation').val("");
    $('#fltrclient').val("");
    $('#fltrentity').val("");

    $('#fltrProject').val("");
    $('#fltrStatus').val("undefined");
    $('#fltrReqType').val("undefined");
    $('#fltrFileType').val("undefined");
    $('#EngPartner').val("");
    $('#EngManager').val("");

    $('#fltrdepart').val("");
    $('#fltrBranch').val("");
    $('#fltrContainerCode').val("");
   // selectedLos = "";
    //selectedSbu = "";
    $('#fltrLos').val("");
    $('#fltrSbu').val("");
    $('#fltrItem_Status').val("undefined");
    $('#fltrHistorical_Status').val("undefined");

    selectedPartner = "";
    selectedManager = "";
    selectedLocation = "";
    selectedEntity = "";

    if ($('#User_Role').val() == "SuperAdmin") {
        selectedLos = "";
        selectedSbu = "";
        $('#fltrLos').val("");
        $('#fltrSbu').val("");
        $('#Los').val("");
        $('#sbu').val("");
    }

    $('#select_all').prop('checked', false);
    Selected_list = [];
    BulkUpdateList = [];
    $('#holdbtn').css("display", "none");
    $('#rejectbtn').css("display", "none");
    $('#approvebtn').css("display", "none");
    
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

function retentionSortTable(sortData) {
    if (order == "ASC" && previousSort == sortData) {
        order = "DESC"
    }
    else {
        order = "ASC"
    }
    sort = sortData;
    previousSort = sort;
    loadRetentionData(1);
}

function redirectEditPage(ID, statusID, reqType) {
    window.location.href = "/Request/CreateRequest?page=Edit&requestID=" + ID + '&requestType_ID=' + reqType + '&pageType=' + pageType + '&status=' + statusID
}
function redirectUpdatePage(ID, statusID, reqType) {
    window.location.href = "/Request/CreateRequest?page=Update&requestID=" + ID + '&requestType_ID=' + reqType + '&pageType=' + pageType + '&status=' + statusID
}

function redirectDetailPage(ID, statusID, reqType) {
    window.location.href = "/Request/CreateRequest?page=Detail&requestID=" + ID + '&requestType_ID=' + reqType + '&pageType=' + pageType + '&status=' + statusID
}

function DeleteFunction(ID, ReqTypeID) {
    deleteRequestID = ID;
    deleteRequestTypeID = ReqTypeID;
    $('#alert_delete').modal('show');
}

function Delete() {
    var data = new FormData();
    data.append('__RequestVerificationToken', token);
    $.ajax({
        url: '/Request/DeleteRequest?requestID=' + deleteRequestID + '&actionBy=' + actionBy + '&requestType=Request&requestTypeID=' + deleteRequestTypeID,
        type: "POST",
        data: data,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();
            $('#alert_delete').modal('hide');
            $('#add_success').modal('show');
            if (deleteRequestTypeID == 1) {
                $('#success_msg').html(unescape(escape('Request - ' + deleteRequestID + ' has been Successfully Deleted!!')));
            }
            else if (deleteRequestTypeID == 2) {
                $('#success_msg').html(unescape(escape('Re-Archival Request - ' + deleteRequestID + ' has been Successfully Deleted!!')));
            }
            else if (deleteRequestTypeID == 3) {
                $('#success_msg').html(unescape(escape('Retrieval Request - ' + deleteRequestID + ' has been Successfully Deleted!!')));
            }
            else if (deleteRequestTypeID == 4) {
                $('#success_msg').html(unescape(escape('Disposal Request - ' + deleteRequestID + ' has been Successfully Deleted!!')));
            }
            loadData(1);
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function ShowModalComment(type, action) {
    $('#addCommentsHold').modal('show');
    var ModelTitle = '';
    var BtnColor = '';


    if (type == 4) {
        ModelTitle = "Onhold Request";
        BtnColor = "#933401";
    }
    else if (type == 9) {
        ModelTitle = "Reject Request";
        BtnColor = "#D04A02";
    }
    else if (type == 8) {
        if (action == 1) {
            ModelTitle = "Submit Request";
            BtnColor = "#D04A02";
        }
        else {
            ModelTitle = "Approve Request";
            BtnColor = "#4EB523";
        }
    }
    var Html = '';
    Html += '<div class="modal-content border-0">'
    Html += '<div class="modal-header grey-bg modal-header-pad">'
    Html += '<h5 class="modal-title font-weight-bold py-0" id="modelTitle">' + ModelTitle + '</h5>'
    Html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>'
    Html += '</div>'
    Html += '<div class="modal-body">'
    Html += '<label id="commentLabel">Add Comments</label>'
    Html += '<textarea class="form-control" id="comment" rows="2" placeholder="Add Comments"></textarea>'
    Html += '</br>'
    if (type == 8) {
        if (action == 1) {
            $('#btnDisable').attr('disabled', false);
            //Html += '<input type = "checkbox"  id="checkboxId" onchange="Checked()"/><span> I Confirmed that to the best of my knowledge, this file is not an Preserve or any other hold </span>'
        }
        else {

            if ($('#fltrReqType').val() == 1) {
                Html += '<input type = "checkbox"  id="checkboxId" onchange="Checked()"/><span> I have reviewed the Archival form and I approve Archival of the files.</span>'
            }
            else if ($('#fltrReqType').val() == 2) {
                Html += '<input type = "checkbox"  id="checkboxId" onchange="Checked()"/><span> I have reviewed the Rearchival form and I approve Rearchival of the files.</span>'
            }
            else if ($('#fltrReqType').val() == 3) {
                Html += '<input type = "checkbox"  id="checkboxId" onchange="Checked()"/><span> I have reviewed the Retrieval form and I approve Retrieval of the files.</span>'
            }
            else if ($('#fltrReqType').val() == 4) {
                Html += '<input type = "checkbox"  id="checkboxId" onchange="Checked()"/><span> I have reviewed the Disposal form and I approve Disposal of the files.</span>'
            }
            else if ($('#fltrReqType').val() == 5) {
                Html += '<input type = "checkbox"  id="checkboxId" onchange="Checked()"/><span> I have reviewed the form and I approve Preservation Request.</span>'
            }

        }
    }

    Html += '</div>'
    Html += '<div class="modal-footer">'
    Html += '<button type="button" class="btn btn-secondary second_btn" data-dismiss="modal">Cancel</button>'
    if (type == 8) {
        if ($('#fltrReqType').val() == 5 && (designationID == 3 || userRoleID == 8 || userRoleID == 9 || designationID == 2)) {
            Html += '<button type="button" class="btn btn-primary delete_btn" style="background-color: ' + BtnColor + '" onclick="SwitchLegalApprove(' + type + ')" id="btnDisable" Disabled>' + ModelTitle + '</button>'
        }
        else {
            if (pageType == 4) {
                Html += '<button type="button" class="btn btn-primary delete_btn" style="background-color: ' + BtnColor + '" onclick="ApprovalUpdate(' + type + ')" id="btnDisable">' + ModelTitle + '</button>'
            }
            else {
                Html += '<button type="button" class="btn btn-primary delete_btn" style="background-color: ' + BtnColor + '" onclick="ApprovalUpdate(' + type + ')" id="btnDisable" Disabled>' + ModelTitle + '</button>'
            }
        }
    }
    else {
        if ($('#fltrReqType').val() == 5 && (designationID == 3 || userRoleID == 8 || userRoleID == 9 || (designationID == 2))) {
            Html += '<button type="button" class="btn btn-primary delete_btn" style="background-color: ' + BtnColor + '" onclick="SwitchLegalApprove(' + type + ')">' + ModelTitle + '</button>'
        }
        else {
            Html += '<button type="button" class="btn btn-primary delete_btn" style="background-color: ' + BtnColor + '" onclick="ApprovalUpdate(' + type + ')">' + ModelTitle + '</button>'
        }
    }
    Html += '</div>'
    Html += '</div>'
    $('.addcomments').html(unescape(escape(Html)));

}

function Checked() {
    if (($('#customRadio6').is(':checked') && $('#customRadio7').is(':checked')) || ($('#customRadio5').is(':checked') && $('#customRadio8').is(':checked'))) {
        if (document.getElementById("EditcheckboxId").checked) {
            if (document.getElementById("btnDisable").disabled) {
                $('#btnDisable').attr('disabled', false);
            }
            else {
                $('#btnDisable').attr('disabled', true);
            }
        }
        else {
            $('#btnDisable').attr('disabled', true);
        }
    }
    else {
        if (document.getElementById("btnDisable").disabled) {
            $('#btnDisable').attr('disabled', false);
        }
        else {
            $('#btnDisable').attr('disabled', true);
        }
    }
}

function ChangesChecked() {
    if (($('#customRadio6').is(':checked') && $('#customRadio7').is(':checked')) || ($('#customRadio5').is(':checked') && $('#customRadio8').is(':checked'))) {
        if (document.getElementById("AckcheckboxId").checked) {
            if (document.getElementById("btnDisable").disabled) {
                $('#btnDisable').attr('disabled', false);
            }
            else {
                $('#btnDisable').attr('disabled', true);
            }
        }
        else {
            $('#btnDisable').attr('disabled', true);
        }
    }
}

function ApprovalUpdate(type) {
    var SuccessModel = '';
    var Title = '';
    var Content = '';
    var Color = '';

    if (type != 8 && ($('#comment').val() == null || $('#comment').val() == "")) {
        $('#comment').css('border-color', 'Red');
        $('#commentLabel').css('color', 'Red');
        return false;
    }

    $('#addCommentsHold').modal('hide');

    var fileData = new FormData();

    //var req = [];
    //req.push(requestID);
    var Input = {
        Ids: Selected_list,
        BulkUpateList: BulkUpdateList,
        StatusId: type,
        ActionBy: actionBy,
        Comments: $('#comment').val(),
        Type: type
    };

    fileData.append('Inputs', JSON.stringify(Input));
    fileData.append('__RequestVerificationToken', token);

    $.ajax({
        url: '/Request/ApprovalUpdate?pageType=' + $('#pageType').val(),
        data: fileData,
        type: "POST",
        contentType: false,
        processData: false,
        beforeSend: function () {   
            // Show full page LoadingOverlay
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();
            $('#approvePopup').modal('hide');
            $('#approvalSuccess').modal('show');
            if (type == 4) {
                Title = "On Hold!";
                Content = "Your Approval Request has been On hold!";
                Color = "#933401";
            }
            else if (type == 9) {
                Title = "Rejected!";
                Content = "Your Approval Request has been Rejected!";
                Color = "#D04A02";
            }
            else if (type == 8) {
                Title = "Approved!";
                Content = "Your Approval Request has been Approved Successfully!";
                Color = "#4EB523";
            }
            SuccessModel += '<div class="modal-content">'
            SuccessModel += '<div class="success_pop text-center py-3"> <span class="icon-success pop-tick"></span> </div>'
            SuccessModel += '<div class="modal-body text-center">'
            SuccessModel += '<h4>' + Title + '</h4>'
            SuccessModel += '<p id="draft_success_msg">' + Content + '</p>'
            SuccessModel += '</div>'
            SuccessModel += '<div class="modal-footer pop_f_btn">'
            SuccessModel += '<button type="button" class="btn btn-secondary pop_btn" data-dismiss="modal" onclick="clearTextBox()";">Close</button>'
            SuccessModel += '</div>'
            SuccessModel += '</div>'
            $('.SuccessModel').html(unescape(escape(SuccessModel)));
            SendApprovalMail(result);
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}



//Retention Completed Requests

function loadRetentionData(page) {
    IsGovernmentClientFilter = 0;
    $('#IsRetention').val("Yes");
    document.getElementById("governmentClientCheckBox").checked = false;
    $('#dispose_Footer').show();
    var limit = 10;

    var retentionInp = {
        requestId: $('#R_RequestIdSearch').val(),
        createdBy: $('#R_CreatedBySearch').val(),
        R_StartDateSearch: $('#R_StartDateSearch').val(),
        R_YrSearch: $('#R_YrSearch').val(),
        R_CompletedDateSearch: $('#R_CompletedDateSearch').val(),
        engagementManager: $('#R_EngManagerSearch').val(),
        engagementPartner: $('#R_EngPartnerSearch').val(),
        fileType: $('#R_FileTypeSearch').val(),
        requestType: $('#R_RequestTypeSearch').val(),
        status: $('#R_StatusSearch').val(),
        approverName: $('#R_ApprNameSearch').val(),
        approverDesignation: $('#R_ApprDesigSearch').val(),
        lastRequestApproval: $('#R_LastApprSearch').val(),

        //Filter
        fltr_R_CompleteYear: $('#R_CompleteYear').val(),
        fltr_R_Complete_Date: $('#R_Complete_Date').val(),

        pageType: $('#pageType').val(),
        //Pagination
        page: page,
        limit: limit,
        sort: sort,
        order: order,
    }
    var data = new FormData();
    data.append("RetentionInp", JSON.stringify(retentionInp));
    data.append('__RequestVerificationToken', token);

    $.ajax({
        url: '/Request/GetRetentionCompletedList',
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
            var sNo = ((page - 1) * limit);
            totalCount = result.totalCount;
            if (Selected_list.length == totalCount) {
                $('#R_select_all').prop('checked', true);
            }
            else {
                $('#R_select_all').prop('checked', false);
            }
            var requestStatusID = 0;
            var reqType = 0;
            if (R_Selected_list.length > 0) {
                //select show button logics here
            }
            else {
                //select hide button logics here
            }

            $.each(result.requests, function (key, item) {
                sNo += 1;
                var statusHtml = '';

                requestStatusID = item.status_ID;
                reqType = item.requestType_ID;

                html += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + '>';
                staticHtml += '<tr id=' + item.request_ID + ' val= ' + requestStatusID + ' reqtype =' + reqType + '>';

                if (R_Selected_list.indexOf(item.request_ID) == -1) {
                    html += '<th ><input type="checkbox" class = "R_checkbox" id="Rchk_' + item.request_ID + '" value="' + item.request_ID + '" onclick="Add_R_List(' + item.request_ID + ')" /> </th>';
                }
                else {
                    html += '<th ><input type="checkbox" class = "R_checkbox" id="Rchk_' + item.request_ID + '" value="' + item.request_ID + '" onclick="Add_R_List(' + item.request_ID + ')" checked/> </th>';
                }
                //$('#R_select_all').attr('disabled', false);

                html += '<th scope="row" class="fnt14">' + sNo + '</th>';
                html += '<td class="fnt14">' + item.request_ID + '</td>';
                html += '<td class="fnt14">' + item.requester_Name + '</td>';
                html += '<td class="fnt14">' + item.r_StartDate_Formatted + '</td>';
                html += '<td class="fnt14">' + item.retention_Period_Compeltion + '</td>';
                html += '<td class="fnt14">' + item.r_CompletedDate_Formatted + '</td>';
                if (item.is_Government_Client == 1) {
                    html += '<td class="fnt14 governmentClientStyle">' + item.client_Name + '</td>';
                }
                else {
                    html += '<td class="fnt14">' + item.client_Name + '</td>';
                }
                html += '<td class="fnt14">' + item.engagement_Manager + '</td>';
                html += '<td class="fnt14">' + item.engagement_Partner + '</td>';
                html += '<td class="fn14"><div class="status-report status-report custom_color" style="background-color:transparent">' + item.requestType + '</div></td>';
                html += '<td class="fnt14">' + item.approved_By + '</td>';
                html += '<td class="fnt14">' + item.approverDesignation + '</td>';

                if (item.approved_By != null && item.approved_By != "") {
                    html += '<td class="fnt14">' + item.lastRequestApproval + '</td>';
                }
                else {
                    html += '<td class="fnt14"></td>';
                }

                staticHtml += '<td class="fnt14">' + item.fileType + '</td>';
                staticHtml += '<td class="fnt14" id=' + requestStatusID + '><div class="status-report status-report custom_color" style="background-color:' + item.status_Code + '">' + item.status + '</div></td>';
                staticHtml += '<th style="padding-top: 6px !important;padding-bottom: 4px !important;">'
                staticHtml += '<div class="dropdown">'
                staticHtml += '<button class="btn bg-transparent fnt16 font-weight-bold" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ... </button>'
                if (requestStatusID == 2 || requestStatusID == 5 || requestStatusID == 6 || requestStatusID == 9) {
                  
                    staticHtml += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
                    if (requestStatusID == 2) {
                        staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + 2 + ',' + reqType + ')" > Edit </a>'
                    }
                    if (requestStatusID == 5) {
                        staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + 10 + ',' + reqType + ')" > Dispose </a>'
                    }
                    if (requestStatusID == 6) {
                        staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + 10 + ',' + reqType + ')" > Dispose </a>'
                    }
                    if (requestStatusID == 9) {
                        staticHtml += '<a class="dropdown-item" href = "#" onclick = "redirectEditPage(' + item.request_ID + ',' + 9 + ',' + reqType + ')" >  Resubmit Request </a>'
                    }
                    staticHtml += '</div >'
                    
                }
                staticHtml += '</div>'
                staticHtml += '</th>'
                staticHtml += '</tr>';
                html += '</tr>';
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
                staticHtml += '<td></td>';
                staticHtml += '<td style="Visibility:hidden">No Record(s) Found!</td>';
                staticHtml += '<td></td>';
                staticHtml += '</tr>';
            }
            $('.Retention_tbody').html(html);
            $('#Retention_Table_Static_Data').html(staticHtml);
            if (totalCount != 0) {
                $('tbody tr').on('click', 'td', function () {
                    window.location.href = "/Request/CreateRequest?page=Detail&requestID=" + $(this).closest('tr').attr('id') + '&requestType_ID=' + + $(this).closest('tr').attr('reqtype') + '&pageType=' + pageType + '&status=' + $(this).closest('tr').attr('val')
                });

                var pagination = '';

                pagination += '<ul class="pagination pagg_align">';
                pagination += '<li class="page-item"><a class="page-link" onclick=loadRetentionData(' + 1 + ') ><span style="font-weight:bold"> << </spa> </a></li>';

                if (page == 1) {
                    pagination += '<li class="page-item"><a class="page-link" disabled> Prev</a></li>';
                }
                else {
                    var pageNumber = page - 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick=loadRetentionData(' + pageNumber + ')> Prev</a></li>';
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
                        pagination += '<li class="page-item"><a class="page-link" onclick = loadRetentionData(' + pageSize + ')>' + pageSize + '</a></li >';
                    }
                }
                if (page == lastPage) {
                    pagination += '<li class="page-item"><a class="page-link active">' + lastPage + '</a></li >';
                }
                else {
                    if (lastPage - page >= 5) {
                        pagination += '<li class="page-item"><a class="page-link">....</a></li >';
                    }
                    pagination += '<li class="page-item"><a class="page-link" onclick =  loadRetentionData(' + lastPage + ')>' + lastPage + '</a></li >';
                }
                if (page == lastPage) {
                    pagination += '<li class="page-item"><a class="page-link" disabled>Next </a></li >';
                }
                else {
                    var pageNumber = page + 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick=loadRetentionData(' + pageNumber + ')>Next </a></li >';
                }
                pagination += '<li class="page-item"><a class="page-link" onclick=loadRetentionData(' + lastPage + ') ><span style="font-weight:bold"> >> </spa> </a></li>';

                pagination += '</ul>';
                $('.R_pagination_page').html(pagination);
            }
            else {
                $('.R_pagination_page').html('');
            }

        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function Add_R_List(Id) {
    //var ref_this = $("pills-profile-tab").hasClass('active');

    var attr = $("pills-profile-tab").attr('aria-selected');
    if ($('ul li#pills-profile-tab').hasClass('active')) {
        // do something
        alert("active");
    }
    if (document.getElementById('Rchk_' + Id + '').checked) {
        R_Selected_list.push(Id);
        if (R_Selected_list.length > 0) {
            $('#disposebtn').attr("disabled", false);
        }
    }
    else {
        R_Selected_list = $.grep(R_Selected_list, function (value) {
            return value != Id;
        });
    }
    if (R_Selected_list.length == 0) {
        $('#disposebtn').attr("disabled", true);

    }

    if (R_Selected_list.length == totalCount) {
        $('#R_select_all').prop('checked', true);
    }
    else {
        $('#R_select_all').prop('checked', false);
    }
}

function SetDate() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("R_Complete_Date").setAttribute("max", today);
    document.getElementById("R_Complete_Date").value = today;
}
function Reset() {
    $('#R_CompleteYear').val(8);
    SetDate();
    loadRetentionData(1);
}

function GetFileCoordinator() {
    var items = [];
    $.ajax({
        url: '/Request/GetFileCoordinator',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                items[key] = item.name;
            });
            $('#FileCoordinator').autocomplete({
                source: items,
                select: function (event, ui) {
                    var value = ui.item.value;
                    var id = '';
                    for (var i = 0; i < result.length; i++) {
                        if (value == result[i].name) {
                            id = result[i].id;
                            selectedFC = result[i].id;
                            break;
                        }
                    }
                    //return false;
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

function GetEntityName() {
    var items = [];
    $.ajax({
        url: '/Request/GetEntityName?losCode=' + losCode +
            '&Sbu=' + sbuCode,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                items[key] = item.name;
                //if (item.isSelected) {
                //    selectedEntity = item.name;
                //    $('#fltrentity').val(item.name);
                //}
            });
            $('#fltrentity').autocomplete({
                source: items,
                select: function (event, ui) {
                    var value = ui.item.value;
                    var id = '';
                    for (var i = 0; i < result.length; i++) {
                        if (value == result[i].name) {
                            id = result[i].id;
                            selectedEntity = result[i].name;
                            break;
                        }
                    }
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

function openApproverHistory(ID, RequestType, FileType, IsModifiedOrNot) {
    $('#ApproverHistoryModalTitle').html('<b>' + ID + '</b> - Approver History');
    $.ajax({
        url: '/Request/GetApprovalHistory?requestID=' + ID + '&requestTypeID=' + RequestType + '&fileType=' + FileType + '&isContentModified=' + IsModifiedOrNot,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        beforeSend: function () {
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();

            $('#ApproverHistoryRequester').html(unescape(escape('&nbsp; &nbsp; Requestor : &nbsp <b>' + result.requested_By + '</b>')));
            $('#ApproverHistoryRequesterDesignation').html(unescape(escape('&nbsp; &nbsp; Designation :  &nbsp <b>' + result.requester_Role + '</b>')));

            var html = '';
            var progressBarHtml = '';

            var count = 1;
            var stoppedCount = 1;
            var stoppedflag = false;

            var className = result.className;

            $.each(result.approver_History_DTO, function (key, item) {

                var icon = "fa-check";
                var iconColor = "white";

                if (item.status_ID == 4) {
                    icon = "fa-pause";
                }
                else if (item.status_ID == 11) {
                    icon = "fa-clock fa-3x";
                }
                else if (item.status_ID == 9) {
                    icon = "fa-times";
                }
                else if (item.status_ID == 0) {
                    icon = "fa-clock fa-3x";
                    if (stoppedflag == false) {
                        stoppedCount = count - 1;
                        stoppedflag = true;
                        if (item.bar_Color_Code == "#AE6800" || item.bar_Color_Code == "#E0301E" || item.bar_Color_Code == "#FFB600") {
                            iconColor = "white";
                        }
                    }
                }
                else if (item.status_ID == 3) {
                    if (count == 1) {
                        icon = "fa-check";
                    }
                    else {
                        icon = "fa-clock fa-3x";
                    }
                    if (item.bar_Color_Code == "#E0301E" || item.bar_Color_Code == "#FFB600") {
                        iconColor = "white";
                    }
                }

                progressBarHtml += '<div class="step">';
                progressBarHtml += '<p></p>';
                progressBarHtml += '<div class="' + result.className +'" style="background-color: ' + item.bar_Color_Code + '">';
                progressBarHtml += '<span class=" icon-top">';
                progressBarHtml += '<svg xmlns="http://www.w3.org/2000/svg" width="14.516" height="22" fill="currentColor" color="' + iconColor + '" viewBox="0 0 14.516 22">';
                progressBarHtml += '<g id="wait" transform="translate(-82.5)">';
                progressBarHtml += '<path id="Path_17598" data-name="Path 17598" d="M93.943,8.144c1.511-1.232,3.073-2.506,3.073-4.855V0H82.5V3.289c0,2.35,1.562,3.623,3.073,4.855a12.9,12.9,0,0,1,2.061,1.948A1.935,1.935,0,0,1,87.8,11a1.935,1.935,0,0,1-.162.908,12.9,12.9,0,0,1-2.061,1.948c-1.511,1.232-3.073,2.506-3.073,4.855V22H97.015V18.711c0-2.35-1.562-3.623-3.073-4.855a12.9,12.9,0,0,1-2.061-1.948A1.935,1.935,0,0,1,91.719,11a1.935,1.935,0,0,1,.162-.908A12.9,12.9,0,0,1,93.943,8.144Zm-3.133,4.6a13.927,13.927,0,0,0,2.273,2.164c1.38,1.125,2.572,2.1,2.572,3.8v1.928H83.861V18.711c0-1.7,1.192-2.675,2.572-3.8a13.926,13.926,0,0,0,2.273-2.164,3.613,3.613,0,0,0,0-3.493,13.926,13.926,0,0,0-2.273-2.164c-1.38-1.125-2.572-2.1-2.572-3.8V1.361H95.655V3.289c0,1.7-1.192,2.675-2.572,3.8A13.927,13.927,0,0,0,90.81,9.253,3.613,3.613,0,0,0,90.81,12.747Z" transform="translate(0)" />';
                progressBarHtml += '</g>';
                progressBarHtml += '</svg>';
                progressBarHtml += '</span>';
                progressBarHtml += '</div>';
                progressBarHtml += '<div class="check fa ' + icon + '"></div>';
                progressBarHtml += '</div>';

                html += '<div class="page slide-' + count + '" style="width:' + result.width + '% !important">';
                html += '<div class="title">';
                html += '<div class="item">';
                html += '<h2>Request Type </h2>';
                html += '<p> ' + item.request_Type+' </p>';
                html += '</div>';
                html += '<div class="item">';
                if (count == 1 && RequestType == 5) {
                    html += '<h2> User Name</h2>';
                }
                else {
                    html += '<h2> Approver Name</h2>';
                }
                html += '<p> ' + item.approver_Name +' </p>';
                html += '</div>';
                html += '<div class="item">';
                if (count == 1 && RequestType == 5) {
                    html += '<h2> User Designation</h2>';
                }
                else {
                    html += '<h2> Approver Designation </h2>';
                }
                html += '<p> ' + item.approver_Designation +' </p>';
                html += '</div>';
                html += '<div class="item">';
                html += '<h2> Status </h2>';
                html += '<p class="status-report status-report retrived-status" style="background-color:transparent !important"> ' + item.status +'</p>';
                html += '</div>';
                html += '<div class="item">';
                if (count == 1 && RequestType == 5) {
                    html += '<h2> Submitted Date</h2>';
                }
                else {
                    html += '<h2> Approval Date</h2>';
                }
                html += '<p>' + item.approval_Date +' </p>';
                html += '</div>';
                html += '</div>';
                html += '</div>';

                count += 1;
            });

            //if (result.length < 5) {
            //    for (var i = (count - 1); i < 5; i++) {
            //        progressBarHtml += '<div class="step" style="visibility:hidden">';
            //        progressBarHtml += '<p></p>';
            //        progressBarHtml += '<div class="bullet">';
            //        progressBarHtml += '<span class=" icon-top">';
            //        progressBarHtml += '<svg xmlns="http://www.w3.org/2000/svg" width="14.516" height="22" fill="currentColor" color="#8c8c8c" viewBox="0 0 14.516 22">';
            //        progressBarHtml += '<g id="wait" transform="translate(-82.5)">';
            //        progressBarHtml += '<path id="Path_17598" data-name="Path 17598" d="M93.943,8.144c1.511-1.232,3.073-2.506,3.073-4.855V0H82.5V3.289c0,2.35,1.562,3.623,3.073,4.855a12.9,12.9,0,0,1,2.061,1.948A1.935,1.935,0,0,1,87.8,11a1.935,1.935,0,0,1-.162.908,12.9,12.9,0,0,1-2.061,1.948c-1.511,1.232-3.073,2.506-3.073,4.855V22H97.015V18.711c0-2.35-1.562-3.623-3.073-4.855a12.9,12.9,0,0,1-2.061-1.948A1.935,1.935,0,0,1,91.719,11a1.935,1.935,0,0,1,.162-.908A12.9,12.9,0,0,1,93.943,8.144Zm-3.133,4.6a13.927,13.927,0,0,0,2.273,2.164c1.38,1.125,2.572,2.1,2.572,3.8v1.928H83.861V18.711c0-1.7,1.192-2.675,2.572-3.8a13.926,13.926,0,0,0,2.273-2.164,3.613,3.613,0,0,0,0-3.493,13.926,13.926,0,0,0-2.273-2.164c-1.38-1.125-2.572-2.1-2.572-3.8V1.361H95.655V3.289c0,1.7-1.192,2.675-2.572,3.8A13.927,13.927,0,0,0,90.81,9.253,3.613,3.613,0,0,0,90.81,12.747Z" transform="translate(0)" />';
            //        progressBarHtml += '</g>';
            //        progressBarHtml += '</svg>';
            //        progressBarHtml += '</span>';
            //        progressBarHtml += '</div>';
            //        progressBarHtml += '<div class="check fas fa-check"></div>';
            //        progressBarHtml += '</div>';
            //    }
            //}
            if (result.approver_History_DTO.length != 0) {

                $('#approver_history').modal('show');

                $('#ApproverHistoryProgressBar').html(unescape(escape(progressBarHtml)));
                $('#ApproverHistoryForm').html(unescape(escape(html)));

                const progressText = document.querySelectorAll(".step p");
                const progressCheck = document.querySelectorAll(".step .check");
                const bullet = document.querySelectorAll('.step .' + className + '');

                if (stoppedflag == true) {
                    count = stoppedCount;
                }

                for (var i = 0; i < count; i++) {
                    bullet[i].classList.add("active");
                    progressCheck[i].classList.add("active");
                    progressText[i].classList.add("active");
                }
            }
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function DisposePopClear(type) {
    $('#Action_Field').val(type);
    $('#AckPopupcheckboxId').attr('Checked', false);
    $('#disposeReq_Cmd').css('border-color', 'lightgrey');
    $('#disposeReq_Cmd_Lbl').css('color', 'Black');
    $('#disposeReq_Cmd').val("");
    $('#ack_popUp').modal('show');
}

function ACKChecked() {
    if (document.getElementById("AckPopupcheckboxId").checked) {
        $('#btnDisposeDisable').attr('disabled', false);
    }
    else {
        $('#btnDisposeDisable').attr('disabled', true);
    }
}

function DisposalValidate() {
    var isValid = true;
    if (!document.getElementById('disposeReq_Cmd').validity.valid) {
        $('#disposeReq_Cmd').css('border-color', 'Red');
        $('#disposeReq_Cmd_Lbl').css('color', 'Red');
        isValid = false;
    }
    else {
        $('#disposeReq_Cmd').css('border-color', 'lightgrey');
        $('#disposeReq_Cmd_Lbl').css('color', 'Black');
    }
    return isValid;
}

function RequestAction(type) {

    var res = DisposalValidate();

    if (res == false) {
        return false;
    }
    var fileData = new FormData();
    var req = [];
    req.push(R_Selected_list);
    var Input = {
        Ids: R_Selected_list,
        StatusId: type,
        ActionBy: actionBy,
        Comments: $('#disposeReq_Cmd').val(),
        Type: type
    };
    fileData.append('Inputs', JSON.stringify(Input));
    fileData.append('__RequestVerificationToken', token);

    $.ajax({
        url: '/Request/BulkRequestActions',
        data: fileData,
        type: "POST",
        contentType: false,
        processData: false,
        beforeSend: function () {
            // Show full page LoadingOverlay
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();
            $('#ack_popUp').modal('hide');
            var SuccessModel = '';
            SuccessModel += '<div class="modal-content">'
            SuccessModel += '<div class="success_pop text-center py-3"> <span class="icon-success pop-tick"></span> </div>'
            SuccessModel += '<div class="modal-body text-center">'
            SuccessModel += '<h4> Success </h4>'
            SuccessModel += '<p id="draft_success_msg">Your Disposal Request has been Created Successfully!</p>'
            SuccessModel += '</div>'
            SuccessModel += '<div class="modal-footer pop_f_btn">'
            SuccessModel += '<button type="button" class="btn btn-secondary pop_btn" data-dismiss="modal" onclick="redirectPage()";>Close</button>'
            SuccessModel += '</div>'
            SuccessModel += '</div>'
            $('.SuccessModel').html(unescape(escape(SuccessModel)));
            $('#approvalSuccess').modal('show');
            R_Selected_list = [];
            $('#R_select_all').attr('Checked', false);
            loadRetentionData(1);
            SendMail(result);
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function redirectPage() {
    window.location.href = "/Request?Pagetype=" + pageType;
}

function SwitchLegalApprove(type) {
    //var req = [];
    var SuccessModel = '';
    var Title = '';
    var Content = '';
    var comments = '';
    var Color = '';
   // req.push(requestID);
    comments = $('#comment').val();
    var fileData = new FormData();
    var Input = {
        Ids: Selected_list,
        StatusId: type,
        ActionBy: actionBy,
        Comments: comments,
    };

    fileData.append('Inputs', JSON.stringify(Input));
    fileData.append('__RequestVerificationToken', token);

    $.ajax({
        url: '/Request/SwitchLegalApprove?actionBy=' + $('#Action_By').val() + '&requestType=Request&requestTypeID=' + $('#requestType_ID').val(),
        type: "POST",
        data: fileData,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#loaders').show();
        },
        success: function (result) {
            $('#loaders').hide();
            $('#addCommentsHold').modal('hide');
            $('#approvalSuccess').modal('show');
            if (type == 4) {
                Title = "On Hold!";
                Content = "Your Preservation Request has been On hold!";
                Color = "#933401";
            }
            else if (type == 9) {
                Title = "Rejected!";
                Content = "Your Preservation Request has been Rejected!";
                Color = "#D04A02";
            }
            else if (type == 8) {
                Title = "Approved!";
                Content = "Your Preservation Request has been Approved Successfully!";
                Color = "#4EB523";
            }
            SuccessModel += '<div class="modal-content">'
            SuccessModel += '<div class="success_pop text-center py-3"> <span class="icon-success pop-tick"></span> </div>'
            SuccessModel += '<div class="modal-body text-center">'
            SuccessModel += '<h4>' + Title + '</h4>'
            SuccessModel += '<p id="draft_success_msg">' + Content + '</p>'
            SuccessModel += '</div>'
            SuccessModel += '<div class="modal-footer pop_f_btn">'
            SuccessModel += '<button type="button" class="btn btn-secondary pop_btn" data-dismiss="modal" onclick="redirectPage()";">Close</button>'
            SuccessModel += '</div>'
            SuccessModel += '</div>'
            $('.SuccessModel').html(unescape(escape(SuccessModel)));
            SendSwitchLegalApproveMail(result);
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function SendApprovalMail(result) {
    var fileData = new FormData();
    fileData.append('request', JSON.stringify(result.approvalUpdateDetails));
    fileData.append('__RequestVerificationToken', token);

    $.ajax({
        url: '/Request/SendApprovalMail?RequestTypeId=' + $('#requestType_ID').val(),
        data: fileData,
        type: "POST",
        contentType: false,
        processData: false,
        beforeSend: function () {
        },
        success: function (result) {

        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}


/// Historical Request

function loadOwnersHistoricalData(page) {
    var limit = 10;
    $('#dispose_Footer').hide();

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
        fltrItem_Status: $('#fltrItem_Status').val(),
        fltrHistorical_Status: $('#fltrHistorical_Status').val(),
        pageType: $('#pageType').val(),
        page: page,
        limit: limit,
        sort: sort,
        order: order,
    }

    var data = new FormData();
    data.append("RequestInput", JSON.stringify(requestInp));
    data.append('__RequestVerificationToken', token);

    $.ajax({
        url: '/Historical/GetHistoricalRequestList?Isfrom_myRequest=true',
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
            var itemStatus = 0;
            var sNo = ((page - 1) * limit);
            var totalCount = result.totalCount;

            $.each(result.historical_Requests, function (key, item) {
                sNo += 1;
                historical_Status_ID = item.historical_Status_ID;
                //itemStatus = item.item_Status;
                if (item.item_Status == "In") {
                    itemStatus = 5;
                }
                else if (item.item_Status == "Out") {
                    itemStatus = 7;
                }
                else if (item.item_Status == "Out Permenant") {
                    itemStatus = 6;
                }
                else if (item.item_Status == "Destroyed") {
                    itemStatus = 10;
                }
                html += '<tr id=' + item.historical_ID + ' historicalStatusid=' + historical_Status_ID + ' item_Status=' + itemStatus+'>';
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

                staticHtml += '<tr id=' + item.historical_ID + ' historicalStatusid=' + historical_Status_ID + ' item_Status=' + itemStatus + '>';
                if (item.item_Status != null && item.item_Status != "") {
                    staticHtml += '<td class="fnt14">' + item.item_Status + '</td>';
                }
                else {
                    staticHtml += '<td class="fnt14"></td>';
                }
                if (item.historical_Status != null && item.historical_Status != "") {
                    staticHtml += '<td class="fnt14"><div class="status-report status-report custom_color" style="background-color:' + item.historical_StatusCode + '">' + item.historical_Status + '</div></td>';
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
            $('.tbody').html(html);
            $('#Historical_Table_Static_Data').html(staticHtml);
            if (totalCount != 0) {
                $('tbody tr').on('click', 'td', function () {
                    window.location.href = "/Request/CreateRequest?page=HistoricalDetail&historicalID=" + $(this).closest('tr').attr('id') + '&pageType=9&HistoricalStatusID=' + $(this).closest('tr').attr('historicalStatusid') + '&itemStatus=' + $(this).closest('tr').attr('item_Status');
                });
                var pagination = '';

                pagination += '<ul class="pagination pagg_align">';
                pagination += '<li class="page-item"><a class="page-link" onclick=loadOwnersHistoricalData(' + 1 + ') ><span style="font-weight:bold"> << </spa> </a></li>';

                if (page == 1) {
                    pagination += '<li class="page-item"><a class="page-link" disabled> Prev</a></li>';
                }
                else {
                    var pageNumber = page - 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick=loadOwnersHistoricalData(' + pageNumber + ')> Prev</a></li>';
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
                        pagination += '<li class="page-item"><a class="page-link" onclick = loadOwnersHistoricalData(' + pageSize + ')>' + pageSize + '</a></li >';
                    }
                }
                if (page == lastPage) {
                    pagination += '<li class="page-item"><a class="page-link active">' + lastPage + '</a></li >';
                }
                else {
                    if (lastPage - page >= 5) {
                        pagination += '<li class="page-item"><a class="page-link">....</a></li >';
                    }
                    pagination += '<li class="page-item"><a class="page-link" onclick =  loadOwnersHistoricalData(' + lastPage + ')>' + lastPage + '</a></li >';
                }
                if (page == lastPage) {
                    pagination += '<li class="page-item"><a class="page-link" disabled>Next </a></li >';
                }
                else {
                    var pageNumber = page + 1;
                    pagination += '<li class="page-item"><a class="page-link" onclick=loadOwnersHistoricalData(' + pageNumber + ')>Next </a></li >';
                }
                pagination += '<li class="page-item"><a class="page-link" onclick=loadOwnersHistoricalData(' + lastPage + ') ><span style="font-weight:bold"> >> </spa> </a></li>';

                pagination += '</ul>';
                $('.Historical_pagination_page').html(pagination);
            }
            else {
                $('.Historical_pagination_page').html('');
            }

        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function Filter() {
    loadOwnersHistoricalData(1);
}
function FilterRequestList() {
    Selected_list = [];
    loadData(1);
}

function SendSwitchLegalApproveMail(result) {
    var fileData = new FormData();
    fileData.append('request', JSON.stringify(result.approvalUpdateDetails));
    fileData.append('__RequestVerificationToken', token);

    $.ajax({
        url: '/Request/SendSwitchLegalApproveMail',
        data: fileData,
        type: "POST",
        contentType: false,
        processData: false,
        beforeSend: function () {
        },
        success: function (result) {

        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}

function SendMail(result) {
    var fileData = new FormData();
    fileData.append('request', JSON.stringify(result.request_details));
    fileData.append('files', JSON.stringify(result.files_details));
    fileData.append('owners', JSON.stringify(result.owner_details));
    fileData.append('__RequestVerificationToken', token);
    $.ajax({
        url: '/Request/SendBulkUploadEmail?isBulk=true',
        data: fileData,
        type: "POST",
        contentType: false,
        processData: false,
        beforeSend: function () {
        },
        success: function (result) {
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}