<!Doctype html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
  		<link href="css/flatly.css" rel="stylesheet" media="screen">
  		<script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>
  		<script src="js/bootstrap.min.js" type="text/javascript"></script>
  		<style>
  			h1 {text-align: center;
  				color: white;
  			}
  			body{
  				background-color: rgb(25, 27, 42);
  			}

  			label{
  				color: white;
  			}

  			.submitBtn{
  				background-color: rgb(51, 164, 33);
  				color: rgb(25, 27, 42);
  			}
  		</style>

	</head>
	
	<body>
		<h1>Sign Up</h1>
		
			<form action="welcome_get.php" method="get" class="form-horizontal">
				<div class ="form-group">
    				<label for="Username" class="col-sm-offset-1 col-sm-2 control-label"> Username:</label>
    				<div class="col-sm-6">
    					<input type="text" class="form-control" id="Username" name="user" placeholder="Enter Username" required/>
  					</div>
				</div>

				<div class ="form-group">
    				<label for="E-Mail" class="col-sm-offset-1 col-sm-2 control-label"> E-Mail:</label>
    				<div class="col-sm-6">
    					<input type="text" class="form-control" id="E-Mail" name="mail" placeholder ="Enter E-Mail" required pattern="[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+\.?[A-Za-z0-9]+?"/>
  					</div>
				</div>

				<div class ="form-group">
    				<label for="Password" class="col-sm-offset-1 col-sm-2 control-label"> Password:</label>
    				<div class="col-sm-6">
    					<input type="text" class="form-control" id="Password" name="pass" placeholder ="Enter Password" required pattern=".{6,}[A-Za-z0-9]"/>
  					</div>
				</div>

				<div class="col-sm-offset-3 col-sm-9">
    				<input type="submit" class="btn submitBtn btn-sm" name="SignSubmit" value="SignUp" />
				</div>
			</form>

			<h1>Log In</h1>
			<form action="login.php" method="get" class="form-horizontal">
				<div class ="form-group">
    				<label for="logUser" class="col-sm-offset-1 col-sm-2 control-label"> Username:</label>
   					<div class="col-sm-6">
    					<input type="text" class="form-control" id="logUser" name="logUsername" placeholder ="Enter Username" required />
  					</div>
				</div>

				<div class ="form-group">
    				<label for="logPassword" class="col-sm-offset-1 col-sm-2 control-label"> Password:</label>
    				<div class="col-sm-6">
    					<input type="text" class="form-control" id="logPassword" name="logPass" placeholder ="Enter Password" required/>
  					</div>
				</div>

				<div class="col-sm-offset-3 col-sm-9">
    				<input type="submit" class="btn submitBtn btn-sm" name="LogSubmit" value="LogIn" />
				</div>
			</form>
	</body>
</html>