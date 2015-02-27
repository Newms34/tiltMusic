function User (freq, userName) {
	this.freq: freq,
	this.userName: userName;
};

User.prototype.getUserName = function () {
	return this.userName;
}

User.prototype.getUserFreq = function () {
	return this.freq;
}

$("form").submit(function () {
	if ($("input").val() != "null") {
		$("#nameForm").hide()
		$("span").text("Welcome!");
		return;
	}
})
var user = new User()