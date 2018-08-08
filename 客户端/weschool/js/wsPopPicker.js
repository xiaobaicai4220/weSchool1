/*
var wsPopPicker = {};
var cell1 = function(){
	console.log("cell1");
}
var cell2 = function(){
	console.log("cell2")
}
var object = {
	'从相册选取图片':cell1,
	'拍照':cell2
}*/
var WsPopPicker = function(object){
	this.object = object
	this.keys = Object.keys(this.object);
	this.tmpl = `<div class="ws-poppicker ws-poppicker-hide">
					<div class="ws-poppicker-cell" data-href="getPicFromGallery" style="top: 0px; border-bottom: 1px solid #DDDDDD;border-top: 1px solid #BBBBBB;">
						<span class="ws-poppicker-cell-text">${object[this.keys[0]]}</span>
					</div>
					<div class="ws-poppicker-cell" data-href="photograph" style="top: 48px;">
						<span class="ws-poppicker-cell-text">${object[this.keys[1]]}</span>
					</div>
					<div class="ws-poppicker-cell" data-href="cancel" style="bottom: 0px">
						<span class="ws-poppicker-cell-text">取消</span>
					</div>
				</div>`
	this.wsPoppicker = document.createElement(this.tmpl);
	this.wsPopPickerMask = document.createElement("div");
	this.wsPopBody = document.getElementsByTagName("body")[0];
	this.wsPopPickerMask.classList.add("ws-poppicker-mask");
}
WsPopPicker.prototype = {
	Show:function(){
		this.wsPopBody.appendChild(this.wsPopPickerMask);
		this.wsPopBody.appendChild(this.wsPoppicker);
		var poppicker = document.getElementsByClassName("ws-poppicker-hide")[0];
		poppicker.classList.remove("ws-poppicker-hide");
		poppicker.classList.add("ws-poppicker-show");
	},
	Hide:function(){
		poppicker.classList.remove("ws-poppicker-show");
		poppicker.classList.add("ws-poppicker-hide");
		
	}
}
