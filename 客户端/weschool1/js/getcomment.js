var createCommentFragment = function(datas) {
	            //预览图片的分组号
                var groundIndex=0;
				var fragment = document.createDocumentFragment();
				for(var i = 0; i < datas.length; i++) {
					var oli = document.createElement("li");
					oli.className = "mui-table-view-cell";
					fragment.appendChild(oli);
					var odiv1 = document.createElement("div");
					odiv1.className = "customer_comment_area";
					oli.appendChild(odiv1);
					var odiv2 = document.createElement("div");
					odiv2.className = "photo_area";
					odiv1.appendChild(odiv2);
					var oimg1 = document.createElement("img");
					oimg1.setAttribute("src", datas[i].UserPhoto);
//					oimg1.setAttribute("data-preview-group",i);
//					oimg1.setAttribute("data-preview-src",i);
					odiv2.appendChild(oimg1);
					var odiv3 = document.createElement("div");
					odiv3.className = "com_area";
					odiv1.appendChild(odiv3);
					var odiv4 = document.createElement("div");
					odiv4.className = "username";
					odiv4.innerText = datas[i].UserID;
					odiv3.appendChild(odiv4);
					var odiv5 = document.createElement("div");
					odiv5.className = "comment_entry";
					odiv5.innerText = datas[i].Comment;
					odiv3.appendChild(odiv5);
					var odiv6 = document.createElement("div");
					odiv6.className = "comment_img";
					odiv3.appendChild(odiv6);
					if(datas[i].CommmentImgs.length!=0){
						groundIndex++;
					}
					for(var j = 0; j < datas[i].CommmentImgs.length; j++) {
						var oimg2 = document.createElement("img");
						oimg2.setAttribute("src", datas[i].CommmentImgs[j]);
						oimg2.setAttribute("data-preview-group","grounp"+groundIndex);
						oimg2.setAttribute("data-preview-src",datas[i].CommmentImgs[j].replace("126.126","668.500"));
						odiv6.appendChild(oimg2);
					}
					var odiv7 = document.createElement("div");
					odiv7.className = "clear_float";
					odiv1.appendChild(odiv7);
				}
				return fragment;

			}