var pageSize = 1;
var order = "";
var sort = "";
var previousSort = "";
var actionBy = "";
var IsvalidImg = true;
var pageType = 0;
var deleteRequestID = "";
var form = $('#__AjaxAntiForgeryForm');
var token = $('input[name="__RequestVerificationToken"]', form).val();

$(document).ready(function () {
    actionBy = $('#Action_By').val();
    pageType = $('#pageType').val();
    loadData(1);
});

function loadData(page) {
    var limit = 10;

    var requestInp = {
        requestId: $('#requestId').val(),
        createdDate: $('#createdDate').val(),
        engagementManager: $('#engagementManager').val(),
        engagementPartner: $('#engagementPartner').val(),
        fileType: $('#fileType').val(),
        requestType: $('#requestType').val(),
        fltrStatus: 1,
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
            var sNo = ((page - 1) * limit);
            var totalCount = result.totalCount

            $.each(result.requests, function (key, item) {
                sNo += 1;
                html += '<tr id=' + item.request_ID + '>';
                html += '<th scope="row" class="fnt14">' + sNo + '</td>';
                html += '<td class="fnt14">' + item.request_ID + '</td>';
                html += '<td class="fnt14">' + item.createdDate_Formatted + '</td>';
                html += '<td class="fnt14">' + item.engagement_Manager + '</td>';
                html += '<td class="fnt14">' + item.engagement_Partner + '</td>';
                if (item.fileType == "Preserve")
                    html += '<td class="fnt14 legalStyle">' + item.fileType + '</td>';
                else
                    html += '<td class="fnt14">' + item.fileType + '</td>';
                html += '<td class="fnt14">' + item.requestType + '</td>';
                html += '<th>'
                html += '<div class="dropdown">'
                html += '<button class="btn bg-transparent fnt16 font-weight-bold" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ... </button>'
                html += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item" href="#" onclick="redirectEditPage(' + item.request_ID + ')">Edit </a> <a class="dropdown-item" href="#"  onclick="DeleteFunction(' + item.request_ID + ')">Delete</a></div>'
                html += '</div>'
                html += '</th>'
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

                $('tbody tr').on('click', 'td', function () {
                    window.location.href = "/Request/CreateRequest?page=Detail&requestID=" + $(this).closest('tr').attr('id') + '&pageType=' + pageType + '&status=1'
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

function redirectEditPage(ID) {
    window.location.href = "/Request/CreateRequest?page=Draft&requestID=" + ID + '&requestType_ID=1' + '&pageType=' + pageType + '&status=1'
}

function DeleteFunction(ID) {
    deleteRequestID = ID;
    $('#alert_delete').modal('show');
}

function Delete() {
    var data = new FormData();
    data.append('__RequestVerificationToken', token);
    $.ajax({
        url: '/Request/DeleteRequest?requestID=' + deleteRequestID + '&actionBy=' + actionBy + '&requestType=Draft&requestTypeID=1',
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
            $('#success_msg').html(unescape(escape('Request - ' + deleteRequestID + ' has been Successfully Deleted!!')));
            loadData(1);
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
}