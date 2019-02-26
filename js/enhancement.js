function EnchantSuccess(item){
				if(item.type == "accessories") {
					success_list = {
						"+0": "I",
						"I": "II",
						"II": "III",
						"III": "IV",
						"IV": "V",
						"V": "V",
					}
				} else {
					success_list = {
						"+0": "+1",
						"+1": "+2",
						"+2": "+3",
						"+3": "+4",
						"+4": "+5",
						"+5": "+6",
						"+6": "+7",
						"+7": "+8",
						"+8": "+9",
						"+9": "+10",
						"+10": "+11",
						"+11": "+12",
						"+12": "+13",
						"+13": "+14",
						"+14": "+15",
						"+15": "I",
						"I": "II",
						"II": "III",
						"III": "IV",
						"IV": "V",
						"V": "V",
					}
				}
				item.level = success_list[item.level]
				return item;
			}

			function EnchantFailed(item){
				if(item.type == "accessories") {
					item.type = "destroyed";
					item.level = "+0";
					item.name = "destroyed " + item.name;
					item.image = "";
					return item;
				}
				failed_list = {
					"+0": "+0",
					"+1": "+1",
					"+2": "+2",
					"+3": "+3",
					"+4": "+4",
					"+5": "+5",
					"+6": "+6",
					"+7": "+7",
					"+8": "+8",
					"+9": "+9",
					"+10": "+10",
					"+11": "+11",
					"+12": "+12",
					"+13": "+13",
					"+14": "+14",
					"+15": "+15",
					"I": "I",
					"II": "I",
					"III": "II",
					"IV": "III",
					"V": "V",
				}
				item.level = failed_list[item.level]
				return item;
			}

			function EnchantFailedCron(item){
				if(item.type == "accessories") {
					rand = Math.floor(Math.random() * 101);
					if(rand < 35) {

						failed_list = {
							"+0": "+0",
							"I": "+0",
							"II": "I",
							"III": "II",
							"IV": "III",
							"V": "V",
						}
						item.level = failed_list[item.level]
						return item;
					} 
				} 
				return item;
			}

			function EnchantRate(type, current_level, fs) {
				current_level = current_level.toString()
				var R = 0;
				if(type == "armor") {
					if(parseInt(current_level) <= 4) {
						return 100.00;
					}
					base_rate = {
						"+5" : 70.00,
						"+6" : 25.64,
						"+7" : 17.24,
						"+8" : 11.76,
						"+9" : 7.69,
						"+10" : 6.25,
						"+11" : 5.00,
						"+12" : 4.00,
						"+13" : 2.86,
						"+14" : 2.00,
						"+15" : 11.76,
						"I" : 7.96,
						"II" : 6.25,
						"III" : 2.00,
						"IV" : 0.3,
					}
					R = base_rate[current_level] * (1 + (0.1 * fs));

					if(R < 70.00) {
						R = base_rate[current_level] * (1 + (0.1 * fs));
					} else {
						per_fs = base_rate[current_level] * 0.1;
						if (((70.00 - base_rate[current_level]) / per_fs)%1 == 0) 
							FST = Math.floor((70.00 - base_rate[current_level]) / per_fs);
						else 
							FST = Math.floor((70.00 - base_rate[current_level]) / per_fs) + 1;
						RT = base_rate[current_level] + FST * per_fs;

						R = RT + (base_rate[current_level] * ((0.02 * (fs - FST))));
						if(R >= 90.00)
							R = 90.00;
					}
				}

				if(type == "weapon") {
					if(parseInt(current_level) <= 6) {
						return 100.00;
					}
					base_rate = {
						"+7" : 70.00, 
						"+8" : 20.41, 
						"+9" : 14.29, 
						"+10" : 10.00, 
						"+11" : 6.67, 
						"+12" : 4.00, 
						"+13" : 2.50, 
						"+14" : 2.00, 
						"+15" : 11.76, 
						"I" : 7.69, 
						"II" : 6.25, 
						"III" : 2.00, 
						"IV" : 0.30,
					}
					// Cap = 70%
					R = base_rate[current_level] * (1 + (0.1 * fs));
					if(R < 70.00) {
						R = base_rate[current_level] * (1 + (0.1 * fs));
					} else {
						per_fs = base_rate[current_level] * 0.1;
						if (((70.00 - base_rate[current_level]) / per_fs)%1 == 0) 
							FST = Math.floor((70.00 - base_rate[current_level]) / per_fs);
						else 
							FST = Math.floor((70.00 - base_rate[current_level]) / per_fs) + 1;
						RT = base_rate[current_level] + FST * per_fs;
						R = RT + (base_rate[current_level] * (0.02 * (fs - FST)));
						if(R >= 90.00)
							R = 90.00;
					}
				}

				if(type == "accessories") {
					base_rate = {
						"+0" : 25.00, 
						"I" : 10.00, 
						"II" : 7.50, 
						"III" : 2.50,
						"IV" : 0.5
					}

					cap = {
						"+0" : 70.00, 
						"I" : 50.00, 
						"II" : 40.00, 
						"III" : 30.00,
						"IV" : 30.00
					}


					R = base_rate[current_level] * (1 + (0.1 * fs));
					if(R < cap[current_level]) {
						R = base_rate[current_level] * (1 + (0.1 * fs));
					} else {
						per_fs = base_rate[current_level] * 0.1;
						if (((cap[current_level] - base_rate[current_level]) / per_fs)%1 == 0) 
							FST = Math.floor((cap[current_level] - base_rate[current_level]) / per_fs);
						else 
							FST = Math.floor((cap[current_level] - base_rate[current_level]) / per_fs) + 1;
						RT = base_rate[current_level] + FST * per_fs;
						R = RT + (base_rate[current_level] * (0.02 * (fs - FST)));
						if(R >= 90.00)
							R = 90.00;
					}
				}
				return R;
			}
			

			function tryEnchant(item, fs) {
				if(item.level == "V") {
					return;
				}

				// Search for +0 accessories to make enhance and removed
				if(item.type =="accessories") {
					var flag = false;
					for (var i = 0; i < current_item.length; i++) {
						if(i == selected_item) { continue;}
						var el = current_item[i];
						if(el.name == item.name && el.level == "+0") {
							flag = true;
							el.type = "destroyed";
							el.level = "+0";
							el.name = "destroyed " + item.name;
							el.image = "";
							break;
						}
					}

					if(flag == false) {
						alert("You need the same +0 of same accessory to enchant.");
						return;
					}

				}

				var rate = EnchantRate(item.type, item.level, fs)
				rand = Math.floor(Math.random() * 101); 
				if(rand <= rate){
					item = EnchantSuccess(item);
					play_success();
					if(rate != 100) {
						new_fs = 0;
					} else {
						new_fs = fs;
					}
				} else {
					if(is_used_cron() == false){
						new_fs = fs_gained(item, fs);
						item = EnchantFailed(item);
					} else {
						new_fs = fs;
						item = EnchantFailedCron(item);
					}
					play_failed();
				}
				return {"item": item, "fs" : new_fs};
			}

			function fs_gained(item, fs) {
				if(item.type == "accessories") {
					return fs+1;
				}
				if(item.level == "+15") 
					return fs+2;
				if(item.level == "I") 
					return fs+3;
				if(item.level == "II") 
					return fs+4;
				if(item.level == "III") 
					return fs+5;
				if(item.level == "IV") 
					return fs+6;
				return fs+1;
			}


			const sleep = (milliseconds) => {
				return new Promise(resolve => setTimeout(resolve, milliseconds))
			}

			function clone(obj) {
			    if (null == obj || "object" != typeof obj) return obj;
			    var copy = obj.constructor();
			    for (var attr in obj) {
			        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
			    }
			    return copy;
			}

			var selected_item = -1;
			var current_item = [];

			var current_fs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			// var current_fs = [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25]

			var preset_item = [
			{
				name: "Kzarka Staff",
				type: "weapon",
				image: "kzarka.png",
				level: "+0"
			},
			{
				name: "Offin Tett's Radiant Staff",
				type: "weapon",
				image: "offin.png",
				level: "+0"
			},
			{
				name: "Dandelion Godr Sphera",
				type: "weapon",
				image: "Dandelion.png",
				level: "+0"
			},
			{
				name: "Nouver Dagger",
				type: "weapon",
				image: "nouver.png",
				level: "+0"
			},
			{
				name: "Kutum Dagger",
				type: "weapon",
				image: "kutum.png",
				level: "+0"
			},
			{
				name: "Bheg's Glove",
				type: "armor",
				image: "bheg.png",
				level: "+0"
			},
			{
				name: "Dim Tree Spirit's Armor",
				type: "armor",
				image: "dim.png",
				level: "+0"
			},
			{
				name: "Red Nose Armor",
				type: "armor",
				image: "rednose.png",
				level: "+0"
			},
			{
				name: "Urugon's Shoes",
				type: "armor",
				image: "urugon.png",
				level: "+0"
			},
			{
				name: "Muskan Shoes",
				type: "armor",
				image: "muskan.png",
				level: "+0"
			},
			{
				name: "Griffon Helmet",
				type: "armor",
				image: "griffon.png",
				level: "+0"
			},
			{
				name: "Giath Helmet",
				type: "armor",
				image: "giath.png",
				level: "+0"
			},
			{
				name: "Ogre Ring",
				type: "accessories",
				image: "ogre.png",
				level: "+0"
			},
			{
				name: "Ring of Crescent Guardian",
				type: "accessories",
				image: "crescent.png",
				level: "+0"
			},
			{
				name: "Basilisk's Belt",
				type: "accessories",
				image: "basilisk.png",
				level: "+0"
			},
			{
				name: "Tungrad Earring",
				type: "accessories",
				image: "tungrad.png",
				level: "+0"
			},
			];

			function play_success() {
				var success_sound = new Audio('./sound/success.mp3');
				success_sound.loop = false;
				success_sound.play();
			}


			function play_failed() {
				var failed_sound = new Audio('./sound/failed.mp3');
				failed_sound.loop = false;
				failed_sound.play();
			}

			function is_used_cron(){
				return $('#cron_stone')[0].checked;
			}

			function renderScreen() {
				if(selected_item != -1) {
					if(current_item[selected_item].type == "accessories") {
						$("#selected_item #box_left").css('background-image', 'url(./images/'+(current_item[selected_item]).image + ')');
					} else if(current_item[selected_item].type == "weapon") {
						if(["+15", "I", "II", "III", "IV", "V"].indexOf(current_item[selected_item].level) >= 0) {
							$("#selected_item #box_left").css('background-image', 'url(./images/con-blackstone-weapon.png)');
						} else {
							$("#selected_item #box_left").css('background-image', 'url(./images/blackstone-weapon.png)');
						}
					} else if(current_item[selected_item].type == "armor") {
						if(["+15", "I", "II", "III", "IV", "V"].indexOf(current_item[selected_item].level) >= 0) {
							$("#selected_item #box_left").css('background-image', 'url(./images/con-blackstone-armor.png)');
						} else {
							$("#selected_item #box_left").css('background-image', 'url(./images/blackstone-armor.png)');
						}
					} else {
						$("#selected_item #box_left").css('background-image', '');
					}



					$("#selected_item #box_right").css('background-image', 'url(./images/'+(current_item[selected_item]).image + ')');
					$("#selected_item #box_right_enc_level").html(
								(current_item[selected_item].level != "+0")?current_item[selected_item].level:"");
				} else {
					$("#selected_item #box_right").css('background-image', '');
				}

				$("#fs").val(current_fs[parseInt($("#current_char").html()) - 1].toString());

				$(".inventory_item_grid").html("");
				for (var i = 0; i < current_item.length; i++) {
					var el = current_item[i];
					if(el.type == "destroyed") {
						continue;
					}
					$(".inventory_item_grid").append(`
						<div class="item ` + ((i==selected_item)?"active":"") + `" index="` + i + `" style="background-image:url('./images/` +  el.image+ `')">
							<span class="enc_level">
							 ` + ((el.level == 0)?"":el.level) + `
							</span>
						</div>
					`);
				};

				// Bind Event
				$(".item").click(function() {
					selected_item = parseInt($(this).attr("index"));
					renderScreen();
				});
			}

			function displayPresetItem() {
				$(".add_item_grid").html("");
				for (var i = 0; i < preset_item.length; i++) {
					var el = preset_item[i];
					$(".add_item_grid").append(`
						<div class="add_item" index="` + i + `" style="background-image:url('./images/` +  el.image+ `')">
							<span class="enc_level">
							 ` + ((el.level == 0)?"":el.level) + `
							</span>
						</div>
					`);
				};
				$(".add_item").click(function() {
					current_item.push(clone(preset_item[parseInt($(this).attr("index"))]));	
					renderScreen();
				});
			}

			$(document).ready(function() {
				renderScreen();

				$("#enchant").click(function(){
					if(selected_item < 0 || current_item[selected_item].type == "destroyed") {
						return;
					}
					var char_index = parseInt($("#current_char").html()) - 1;
					result = tryEnchant(current_item[selected_item], current_fs[char_index]);
					current_item[selected_item] = result.item;
					current_fs[char_index] = result.fs;
					renderScreen();
				});

				$("#previous").click(function() {
					if(parseInt($("#current_char").html()) > 1) {
						$("#current_char").html(parseInt($("#current_char").html()) - 1);
					}
					renderScreen();
				});

				$("#next").click(function() {
					if(parseInt($("#current_char").html()) < 15) {
						$("#current_char").html(parseInt($("#current_char").html()) + 1);
					}
					renderScreen();
				});


				$("#fs").change(function() {
					var char_index = parseInt($("#current_char").html()) - 1;
					current_fs[char_index] = parseInt($(this).val());
					renderScreen();
				});

				displayPresetItem();
			});