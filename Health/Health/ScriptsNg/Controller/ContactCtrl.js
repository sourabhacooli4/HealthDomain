
app.controller('ContactCtrl', ['$scope', 'CrudService', '$http',
    function ($scope, CrudService, $http) {

        // Base Url
        var baseUrl = '/api/Contact/';
        $scope.btnText = "Save";
        $scope.id = 0;

        //Insert and Update operation
        $scope.SaveUpdate = function () {
            var contact = {
                FirstName: $scope.firstName,
                LastName: $scope.lasttName,
                Email: $scope.email,
                Phone: $scope.phone,
                Status: $scope.status,
                ID: $scope.id
            }
            if ($scope.btnText == "Save") {
                var apiRoute = baseUrl + 'SaveContact/';
                var saveContact = CrudService.post(apiRoute, contact);
                saveContact.then(function (response) {
                    if (response.data != "") {
                        alert("Data Save Successfully");
                        $scope.GetContacts();
                        $scope.Clear();

                    } else {
                        alert("Some error");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                });
            }
            else {
                var apiRoute = baseUrl + 'UpdateContact/';
                var UpdateContact = CrudService.put(apiRoute, contact);
                UpdateContact.then(function (response) {
                    if (response.data != "") {
                        alert("Data Update Successfully");
                        $scope.GetContacts();
                        $scope.Clear();

                    } else {
                        alert("Some error");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                });
            }
        }

        //To collect all the data
        $scope.GetContacts = function () {
            var apiRoute = baseUrl + 'GetContacts/';
            var contact = CrudService.getAll(apiRoute);
            contact.then(function (response) {
                $scope.contactss = response.data;
            },
                function (error) {
                    console.log("Error: " + error);
                });
        }

        $scope.GetContacts();


        //To get the particular data
        $scope.GetContactByID = function (dataModel) {
            $scope.id = dataModel.ID;
            $scope.firstName = dataModel.FirstName;
            $scope.lasttName = dataModel.LastName;
            $scope.email = dataModel.Email;
            $scope.phone = dataModel.Phone;
            $scope.status = dataModel.Status;
            $scope.btnText = "Update";
        };


        //Delete operation
        $scope.DeleteContact = function (dataModel) {
            var apiRoute = baseUrl + 'DeleteContact/ID?' + dataModel.ID;
            var deleteContact = CrudService.delete(apiRoute);
            deleteContact.then(function (response) {
                if (response.data != "") {
                    alert("Data Delete Successfully");
                    $scope.GetContacts();
                    $scope.Clear();

                } else {
                    alert("Some error");
                }

            }, function (error) {
                console.log("Error: " + error);
            });
        }


        //Clear operation
        $scope.Clear = function () {
            $scope.ID = 0;
            $scope.firstName = "";
            $scope.lasttName = "";
            $scope.email = "";
            $scope.phone = "";
            $scope.status = "";
            $scope.btnText = "Save";
        }

    }]);