swaggerGE.controller("swaggerBaseController", ['$scope', '$log', 'swaggerBaseService', function($scope, $log, swaggerBaseService){
    
    //display functionality
    $scope.preventUpdate = true;

    
    //get the basic info.
    $scope.basicInfo = swaggerBaseService.newBaseInfo();
    
    //used to test the base info singleton
    $scope.service = null;
    
    
    $scope.updateInfo = function(){
        swaggerBaseService.setSwaggerInfo($scope.basicInfo);
        $scope.service = swaggerBaseService.getSwaggerInfo();
    };
    
    /*
        watch for Api's version number and title
            These are required as part of the SWAGGER definition
    */
    $scope.$watch('basicInfo.info.title', function(){
        $scope.checkMinRequirements();
        //console.log($scope.basicInfo.info.title)
    }, false);
    $scope.$watch('basicInfo.info.version', function(){
        $scope.checkMinRequirements();
    }, false);
    
    $scope.checkMinRequirements = function(){
        if(!$scope.basicInfo.info.title || !$scope.basicInfo.info.version)
            $scope.preventUpdate = true;
        else
            $scope.preventUpdate = false;
    }
    
    /*
        Update the schemes list. Add the scheme if checked, and remove if unchecked
    */
    $scope.updateCheckBox = function(schemeType){
        
        var removedScheme = false;
        
        //check the values in scheme
        for(var i = 0; i < $scope.basicInfo.schemes.length; i++){
            
            if($scope.basicInfo.schemes[i] === schemeType){
                //if its in the list remove it
                $scope.basicInfo.schemes.splice(i, 1);
                
                removedScheme = true;
                
            }     
        }
        
        //if a scheme hasnt been removed, it means it didn't exist so add it to the list.
        if(!removedScheme)
            $scope.basicInfo.schemes.push(schemeType);
        
    }
    
    
}]);