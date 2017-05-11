// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});


chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
      
      var asin = jQuery('#ASIN').val(); 
      
      if (asin) {
          
            getAmazonProductDetails(asin,response);
            return true; //to make sendResponse asynchronous
            
        } else {
            
            response({error : "Please navigate to product page to use this extension."})
        }
      
  }
});


function getAmazonProductDetails(asin,callback){
    
    var payload = JSON.stringify({"asin": asin});
        
    jQuery.ajax({
        url: "xxx.com/api",
        type: "POST",
        data: payload,
        success: function (response) {    
            
        /*            
            {
              "data": {
                "success": "true",
                "asin": "B01LYT95XR",
                "itemName": "Apple iPhone 7 Unlocked CDMA/GSM 32GB A1660 MNAC2LL/A - US Version (Black)",
                "itemPrice": 719,
                "amazonFees": 55,
                "fulfillCost": 3
              }
            }
        */
            
            var res = JSON.parse(response);
            
            if(res.data.success === 'true'){
                
                callback({productDetails: res.data});   
                
            } else {
                
                callback({error : res.data.error})
            }
                        
                               
            
        }
    });
    
}