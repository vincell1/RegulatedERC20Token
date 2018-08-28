//var MyContract = artifacts.require("MyContract")
var BrightCoinRegulatedToken = artifacts.require("./contracts/BrightCoinRegulatedToken.sol");
var BrightCoinKYCContract = artifacts.require("./contracts/BrightCoinInvestorKYC.sol"); 
var BrightCoinInvestorAccreditation = artifacts.require("./contracts/BrightCoinInvestorAccreditationCheck.sol"); 


//Check BalanceOF method for Different accounts.
contract('Testing AutoTransfer & Token  Distribution', (accounts) => {

   let instance
  let owner = accounts[0]
  let account = accounts[1]
  let NewOwner = 0x403f4fedf6127f30e77ae8295dea47eea0832899
  //let newAccount = 0x403f4fedf6127f30e77ae8295dea47eea0832899;

  beforeEach(async () => {
    instancekyc = await BrightCoinKYCContract.deployed()
   instanceAcridetion = await BrightCoinInvestorAccreditation.deployed()
     instance = await BrightCoinRegulatedToken.deployed()
    
  })

  let OwnerBal1,OwnerBal2,AccountBal1,AccountBal2,NewAccountBal1,AccountBal3,currenttime
  
  /*START...............................................................................................*/
//ADD Token for 2 Advisors and then Remove him for further Getting token then trying to give him Token
 it("IT SHOULD Do Auto Transfer", async () => {
  
    try {

    	//Set KYC Details
    	//Start
       var KYCExpiryDateTime = 1566102022;
       var ipfsHashKYC = "QmWDhue9iG8YJPh65TdD6zEYHZeeJKyVJC1e2uARwHGPC7";
     // var InvestordAddress = 0x9750aa30a3281dF657d8B08499e1b5Dbc90e0b5f;
    instancekyc.SetKYCDetailsofInvestor(account,true,KYCExpiryDateTime,ipfsHashKYC,{from: accounts[0]});
   instancekyc.SetKYCDetailsofInvestor(NewOwner,true,KYCExpiryDateTime,ipfsHashKYC,{from: accounts[0]});

    	//End


    	//Set RegD Accredition
    	//Start
    	/* Set Accridition Details*/
      //Start
      var expiryDateRegD = 1566102022;
     var InvestorGeolocation = 1;
      var ipfsHash = "QmWDhue9iG8YJPh65TdD6zEYHZeeJKyVJC1e2uARwHGPC7";
     instanceAcridetion.AddRegDInvestorDetails(account,true,expiryDateRegD,InvestorGeolocation,ipfsHash,{from: accounts[0]});
     instanceAcridetion.AddRegDInvestorDetails(NewOwner,true,expiryDateRegD,InvestorGeolocation,ipfsHash,{from: accounts[0]});
      //End
    	//End  //1534567000
    currenttime  = await instance.GetCurrentTime();
    OwnerBal1 = await instance.balanceOf(owner);
    AccountBal1  = await instance.balanceOf(account); 
   Transaction1  = await instance.sendTransaction({from:account,value:(0.6)*10**18});
    
   DistributeToken = await instance.DistributeToken(account,1534567000,1566102023,0,{from: accounts[0]});

    AccountBal2  = await instance.balanceOf(account);
   OwnerBal2  = await instance.balanceOf(owner);
    


    //Now Transfer this token to New Investor	

 NewTransfer   = instance.transfer(NewOwner,50*(10**18) ,{from: accounts[1]});
  NewAccountBal1  = await instance.balanceOf(NewOwner);
    AccountBal3  = await instance.balanceOf(account);
  


    } 
    catch (e) {
      console.log(` Exception Test Auto Transfer`)
    }
    console.log(currenttime,"currenttime");
   console.log(OwnerBal1,"OwnerBal1");
   console.log(AccountBal1,"AccountBal1");
  console.log(AccountBal2, "AccountBal2");
  console.log(OwnerBal2, "OwnerBal2");
    console.log(NewAccountBal1,"NewAccountBal1");
  console.log(AccountBal3,"AccountBal3");

   
   
   /* Transfer UseCase Log */
   
  // console.log(NewTransfer,"NewTransfer");

  // console.log(TokenAmount, "Token amount post transfer");
  //console.log(NewOwnerBal, "TokenAmountAfterDistributionOwnernewOwner");
  //console.log(AccountBal,"TokenAmountAftertransferwnerAccount");



// console.log(TokenTransfer,"Transaction Output");
  // console.log(balanceAfterTransferAccount1,"balanceAfterTransferAccount1");

 
    })

/*END.............................................................................................*/



})