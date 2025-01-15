//===============================================================================
// master2015hp_InStarTimeSnippet.js
// by master2015hp
// 2022.08.28
//===============================================================================
/*:
 * @plugindesc snippet for In Stars & Time project
 * @author master2015hp
 *
 * @param var id
 * @desc id of the variable which will hold the result of current device test
 * with 1 = gamepad or 0 = keyboard
 * @type number
 * @default 10
 *
 * @param highlight Profile menu switch id
 * @desc for re-selecting Profile option after exit its scene
 * @type number
 * @default 100
 *
 * @param disable moving parallax switch id
 * @desc if this switch is on, parallax won't be moving
 * @type number
 * @default 101
 *
 * @param hide from applying item actor list
 * @desc list of actor Id to be hid from applying item. Separate by ','
 * @type string
 * @default 5
 *
 * @param left button image
 * @desc image for left switch button
 * @default eHelpButtonL
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param right button image
 * @desc image for right switch button
 * @default eHelpButtonR
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param left pad button image
 * @desc image for left switch pad button
 * @default eHelpButtonLPad
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param right pad button image
 * @desc image for right switch pad button
 * @default eHelpButtonRPad
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param button image size
 * @desc the size of a SINGLE frame of the button image
 * @type number
 * @default 32
 *
 * @param button image speed
 * @desc smaller mean faster animation speed
 * @type number
 * @default 10
 *
 * @param button image offset x
 * @desc offset for the button on x axis
 * @type number
 * @default 0
 *
 * @param button image offset y
 * @desc offset for the button on y axis
 * @type number
 * @default 0
 *
 * @param intro movie list
 * @desc list of movies for auto playing during idle
 * @type string[]
 * @default []
 *
 * @param count down time for idle videos
 * @desc if player idling for this much frames, idle videos will start playing
 * @type number
 * @default 300
 *
 * @param play idle video title command name
 * @desc leave it as blank to hide the command from title options
 * @type string
 * @default Watch Intro
 *
 * @param auto play movies if idling
 * @desc whether to use this feature or not
 * @type select
 * @default true
 * @option PLAY MOVIES
 * @value true
 * @option DO NOT PLAY MOVIES
 * @value false
 *
 * @param default fonts
 * @desc setup default fonts here. Leave empty to disable.
 * LanguageName:FontName - don't use Default as a name for Language
 * @type string[]
 * @default ["default1:BestTen-CRT.ttf","japanese:YujiBoku-Regular.ttf"]
 *
 * @param word wrap pad x
 * @desc wrap the text a bit sooner than normal
 * @type number
 * @default 10
 *
 * @help
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░▒░░▒▒▒░░░▒▒░░░░▒▒▒▒░░▒▒▒░░▒░░░░░▒▒░░░░
░▒░▒▒░░░░░▒░▒░░░▒░░▒▒░░░▒▒░▒░░░░░▒░▒░░░
░▒░▒░░░░░▒▒░▒░░░▒░░░▒░░░░▒░▒░░░░▒▒░▒░░░
░▒░▒▒░░░░▒░░░▒░░▒░░▒▒░░░░▒░▒░░░░▒░░░▒░░
░▒░░▒▒░░░▒▒▒▒▒░░▒▒▒▒░░▒▒▒▒░▒░░░░▒▒▒▒▒░░
░▒░░░░▒░▒▒░░░▒░░▒░░▒▒░░░░▒░▒░░░▒▒░░░▒░░
░▒░░░░▒░▒░░░░▒▒░▒░░▒▒░░░░▒░▒░░░▒░░░░▒▒░
░▒░▒▒▒░░▒░░░░░▒░▒▒▒▒░░▒▒▒░░▒▒▒░▒░░░░░▒░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

 * -------------------------------------------------------------------------------
 * ✧ REQUIRE
 * ===============================================================================
 * - Install below Insertdisc5_changeSkillStatusWindow.js
 *
 * -------------------------------------------------------------------------------
 * ✧ FEATURES
 * ===============================================================================
 * Get mapped keys from current in-using device according to in-game key:
master2015hp.isatSnp.getKeyName(key)
 *
 * ex: master2015hp.isatSnp.getKeyName('ok')
 * ex: master2015hp.isatSnp.getKeyName('cancel')
 * - List of in-game keys:
 * -- ok / escape / cancel / menu / shift
 * -- pageup / pagedown / up / down / left / right
 *
 * - To rehighlight PROFILE icon after exit that scene.
 * -- set up the switchID in the plugin editor
 * -- turn that switch ON at the very start of 'menu_presscancel' common event
 * -- currently common event 153
 * 
 * -------------------------------------------------------------------------------
 * ✧ TERMS OF USE
 * ===============================================================================
 * - You must buy a license before using this plugin for any commercial purposes
 * - License must be obtained BEFORE you start selling your game.
 * - NOTE: Games with micro-transactions and/or advertising incomes are considred
 *   commercial use of this plugin!
 * - Edits are allowed as long as "Terms of Use" is not changed in any way.
 *
 * DO NOT COPY, RESELL, REDISTRIBUTE, REPUBLISH OR CLAIM ANY PIECE OF
 * THIS SOFTWARE AS YOUR OWN!
 * Copyright (c) 2022, Isabella Ava
 * Contact me at gmail: master2015hp
 *
 * -------------------------------------------------------------------------------
 * Version History
 * ===============================================================================
 * 2022/02/28 v1.0.0 - Initial release
 *
 */
var master2015hp = master2015hp || {};
master2015hp.isatSnp = master2015hp.isatSnp || {};
master2015hp.isatSnp.a = PluginManager.parameters('master2015hp_InStarTimeSnippet');
master2015hp.isatSnp.lastInputDeviceVarId = Number(master2015hp.isatSnp.a['var id']) || 10;
master2015hp.isatSnp.highlightProfile = Number(master2015hp.isatSnp.a['highlight Profile menu switch id']) || 100;
master2015hp.isatSnp.stopParallax = Number(master2015hp.isatSnp.a['disable moving parallax switch id']) || 101;
master2015hp.isatSnp.lrImageL = master2015hp.isatSnp.a['left button image'] || 'eHelpButtonL';
master2015hp.isatSnp.lrImageR = master2015hp.isatSnp.a['right button image'] || 'eHelpButtonR';
master2015hp.isatSnp.lrImageLPad = master2015hp.isatSnp.a['left pad button image'] || 'eHelpButtonLPad';
master2015hp.isatSnp.lrImageRPad = master2015hp.isatSnp.a['right pad button image'] || 'eHelpButtonRPad';
master2015hp.isatSnp.lrImageSize = Number(master2015hp.isatSnp.a['button image size']) || 32;
master2015hp.isatSnp.lrImageSpeed = Number(master2015hp.isatSnp.a['button image speed']) || 10;
master2015hp.isatSnp.lrOffX = Number(master2015hp.isatSnp.a['button image offset x']) || 0;
master2015hp.isatSnp.lrOffY = Number(master2015hp.isatSnp.a['button image offset y']) || 0;
master2015hp.isatSnp.idleVideosList = JSON.parse(master2015hp.isatSnp.a['intro movie list']) || [];
master2015hp.isatSnp.idleTime = Number(master2015hp.isatSnp.a['count down time for idle videos']) || 300;
master2015hp.isatSnp.autoPlayMovie = master2015hp.isatSnp.a['auto play movies if idling'] == 'true';
master2015hp.isatSnp.idleVidTitleCommand = master2015hp.isatSnp.a['play idle video title command name'];
master2015hp.isatSnp.hideFromApplyingItemActorList = master2015hp.isatSnp.a['hide from applying item actor list'] || '5';
master2015hp.isatSnp.hideFromApplyingItemActorList =
master2015hp.isatSnp.hideFromApplyingItemActorList.split(',').map(function(v) {return Number(v.trim());});

master2015hp.isatSnp.tmpObj = JSON.parse(master2015hp.isatSnp.a['default fonts']) || [];
master2015hp.isatSnp.fontList = {};
master2015hp.isatSnp.tmpObj.forEach(function(str) {
	let data = str.split(':');
	master2015hp.isatSnp.fontList[data[0]] = data[1];
});

master2015hp.isatSnp.wordWrapPadX = Number(master2015hp.isatSnp.a['word wrap pad x']) || 0;

master2015hp.isatSnp.b = [];
master2015hp.isatSnp.b[0] = Input.update;
master2015hp.isatSnp.b[1] = Window_Message.prototype.updateInput;
master2015hp.isatSnp.b[2] = Sprite_Base.prototype.startAnimation;
master2015hp.isatSnp.b[3] = Scene_Battle.prototype.start;
master2015hp.isatSnp.b[4] = Scene_Base.prototype.start;
master2015hp.isatSnp.b[5] = Scene_Item.prototype.createItemWindow;
master2015hp.isatSnp.b[6] = Game_Temp.prototype.reserveCommonEvent;
master2015hp.isatSnp.b[7] = Scene_Base.prototype.closeCommonEventMenuWindows;
master2015hp.isatSnp.b[8] = Scene_Item.prototype.update;
master2015hp.isatSnp.b[9] = Scene_Item.prototype.create;
master2015hp.isatSnp.b[10] = Scene_Battle.prototype.selectActorSelection;
master2015hp.isatSnp.b[11] = Scene_Battle.prototype.createStatusWindow;
master2015hp.isatSnp.b[12] = Scene_Battle.prototype.update;
master2015hp.isatSnp.b[13] = SpriteSelectionMenu.prototype.rc;
master2015hp.isatSnp.b[14] = Scene_Battle.prototype.onActorOk;
master2015hp.isatSnp.b[15] = Scene_Battle.prototype.onActorCancel;
master2015hp.isatSnp.b[16] = Spriteset_Battle.prototype.battleFieldDepthCompare;
master2015hp.isatSnp.b[17] = Scene_Battle.prototype.startActorCommandSelection;
master2015hp.isatSnp.b[18] = BattleManager.endAction;
master2015hp.isatSnp.b[19] = Window_BattleActor.prototype.select;
master2015hp.isatSnp.b[20] = Window_KeyConfig.prototype.select;
master2015hp.isatSnp.b[21] = Scene_KeyConfig.prototype.onActionOk;
master2015hp.isatSnp.b[22] = Scene_GamepadConfig.prototype.commandReset;
master2015hp.isatSnp.b[23] = Scene_KeyConfig.prototype.commandDefault;
master2015hp.isatSnp.b[24] = Scene_KeyConfig.prototype.commandWasd;
master2015hp.isatSnp.b[25] = ConfigManager.makeData;
master2015hp.isatSnp.b[26] = ConfigManager.applyData;
master2015hp.isatSnp.b[27] = Spriteset_Battle.prototype.initialize;
master2015hp.isatSnp.b[28] = Scene_Battle.prototype.createSpriteset;
master2015hp.isatSnp.b[29] = Scene_Title.prototype.update;
master2015hp.isatSnp.b[30] = Scene_Title.prototype.initialize;
master2015hp.isatSnp.b[31] = Window_TitleCommand.prototype.makeCommandList;
master2015hp.isatSnp.b[32] = Scene_Title.prototype.createCommandWindow;
master2015hp.isatSnp.b[33] = Window_ItemList.prototype.refresh;
master2015hp.isatSnp.b[34] = Window_MenuActor.prototype.initialize;
master2015hp.isatSnp.b[35] = Scene_Menu.prototype.start;
master2015hp.isatSnp.b[36] = Game_Map.prototype.updateParallax;
master2015hp.isatSnp.b[37] = Window_Message.prototype.onEndOfText;
master2015hp.isatSnp.b[38] = Window_ChoiceList.prototype.drawItem;
master2015hp.isatSnp.b[39] = ConfigManager.makeData;
master2015hp.isatSnp.b[40] = ConfigManager.applyData;
master2015hp.isatSnp.b[41] = Window_Base.prototype.resetFontSettings;
master2015hp.isatSnp.b[42] = Bitmap.prototype.drawText;
master2015hp.isatSnp.b[43] = Scene_Load.prototype.onLoadSuccess;
master2015hp.isatSnp.b[44] = Window_Options.prototype.refresh;
master2015hp.isatSnp.b[45] = Window_ChoiceList.prototype.refresh;
master2015hp.isatSnp.b[46] = Window_ChoiceList.prototype.initialize;
master2015hp.isatSnp.b[47] = Game_Message.prototype.add;

master2015hp.isatSnp.isGamepadConnected = function() {
	if (navigator.getGamepads) {
	  var gamepads = navigator.getGamepads();
	  if (gamepads) {
		for (var i = 0; i < gamepads.length; i++) {
		  var gamepad = gamepads[i];
		  if (gamepad && gamepad.connected) return true;
		}
	  }
	}
	return false;
};

master2015hp.isatSnp.inputAnyKeyPressed = function() {
	return Input._currentState[Input._latestButton];
};

master2015hp.isatSnp.gamepadAnyButtonPressed = function(checkStick) {
	if (navigator.getGamepads) {
		var gamepads = navigator.getGamepads();
        if (gamepads) {
			for (var i = 0; i < gamepads.length; i++) {
                var gamepad = gamepads[i];
                if (gamepad && gamepad.connected) {
					//any button pressed
                    var buttons = gamepad.buttons;
					for (var j = 0; j < buttons.length; j++) {
						if (buttons[j].pressed) {
							return true;
						}
					}
					//neu nhu xoay hai con lan dieu khien huong di
					if (checkStick) {
						var axes = gamepad.axes;
						var threshold = 0.5;
						for (var j = 0; j < axes.length; j++) {
							if ( Math.abs(axes[j]) > Math.abs(threshold) ) {
								return true;
							}
						}
					}
                }
            }
		}
	}
	return false;
};

///►0001
ConfigManager.ms2015hp_keyboardSetLastKeyName = function(name) {
	this._ms2015_lastKBKeyName = name;
};

ConfigManager.ms2015hp_setLastKey = function(key) {
	this._ms2015_lastKBKey = key;
};

ConfigManager.ms2015hp_setData = function(mode) {
	if (mode == 'reset') {
		this._ms2015_lastKBList = null;
	} else {
		this._ms2015_lastKBList = this._ms2015_lastKBList || {};
		if (this._ms2015_lastKBKeyName && this._ms2015_lastKBKey) {
			if (this._ms2015_lastKBKey.search(/clear/ig) > -1) {
				if (this._ms2015_lastKBList) {
					var keyList = [];
					for (key in this._ms2015_lastKBList) {
						if (this._ms2015_lastKBList[key] == this._ms2015_lastKBKeyName) keyList.push(key);
					}
					keyList.forEach(function(k) {
						delete this._ms2015_lastKBList[k];
					},this);
				}
			} else {
				this._ms2015_lastKBList[this._ms2015_lastKBKey] = this._ms2015_lastKBKeyName;
			}
		}
	}
	this._ms2015_lastKBKeyName = null;
	this._ms2015_lastKBKey = null;
	this.save();
};

Window_KeyConfig.prototype.select = function(index) {
	master2015hp.isatSnp.b[20].call(this, index);
	if (this._list[index])
		ConfigManager.ms2015hp_keyboardSetLastKeyName(this.visualName(index));
};

Scene_KeyConfig.prototype.onActionOk = function() {
	var action = this._actionWindow.currentExt();
	master2015hp.isatSnp.b[21].call(this);
	ConfigManager.ms2015hp_setLastKey(action);
	ConfigManager.ms2015hp_setData();
};

Scene_KeyConfig.prototype.commandDefault = function() {
	master2015hp.isatSnp.b[23].call(this);
	ConfigManager.ms2015hp_setData('reset');
};

Scene_KeyConfig.prototype.commandWasd = function() {
	master2015hp.isatSnp.b[24].call(this);
	ConfigManager.ms2015hp_setData('reset');
};

//
ConfigManager.ms2015hp_gamepadSetLastKeyName = function(name) {
	this._ms2015_lastGPKeyName = name;
};

ConfigManager.ms2015hp_gamepadSetLastKey = function(key) {
	this._ms2015_lastGPKey = key;
};

ConfigManager.ms2015hp_gamepadSetData = function(mode) {
	if (mode == 'reset') {
		this._ms2015_lastGPList = null;
	} else {
		this._ms2015_lastGPList = this._ms2015_lastGPList || {};
		if (this._ms2015_lastGPKeyName && this._ms2015_lastGPKey)
			this._ms2015_lastGPList[this._ms2015_lastGPKey] = this._ms2015_lastGPKeyName;
	}
	this._ms2015_lastGPKeyName = null;
	this._ms2015_lastGPKey = null;
	this.save();
};

Scene_GamepadConfig.prototype.applyButtonConfig = function(buttonId) {
	this._configEnabled = false;
	var index = this._configWindow.index();
	var newConfig = this._configWindow.getButtonKey(index);
	var formerConfig = Input.gamepadMapper[buttonId];
	var formerButton = Input.getGamepadButton(newConfig);
	//
	ConfigManager.ms2015hp_gamepadSetLastKey(newConfig);
	ConfigManager.ms2015hp_gamepadSetLastKeyName(buttonId);
	ConfigManager.ms2015hp_gamepadSetData();
	//
	ConfigManager.gamepadInput[buttonId] = newConfig;
	ConfigManager.gamepadInput[formerButton] = formerConfig;
	ConfigManager.applyGamepadConfig();
	this._configTimer = 12;
};

Scene_GamepadConfig.prototype.commandReset = function() {
	master2015hp.isatSnp.b[22].call(this);
	ConfigManager.ms2015hp_gamepadSetData('reset');
};

//
ConfigManager.makeData = function() {
	var config = master2015hp.isatSnp.b[25].call(this);
	config._ms2015_lastGPList = this._ms2015_lastGPList;
	config._ms2015_lastKBList = this._ms2015_lastKBList;
	return config;
};

ConfigManager.applyData = function(config) {
	master2015hp.isatSnp.b[26].call(this, config);
	this._ms2015_lastGPList = config._ms2015_lastGPList;
	this._ms2015_lastKBList = config._ms2015_lastKBList;
};
///◄0001

master2015hp.isatSnp.cGetPadMap = function(key) {
	var list = Object.keys(Input.gamepadMapper).filter(function(v) {
		return Input.gamepadMapper[v] == key;
	});
	if (list.length <= 0) return [];
	for (var i = 0; i < list.length; i++) {
		switch(Number(list[i])) {
			case 0:
				list[i] = 'button A'; break;
			case 1:
				list[i] = 'button B'; break;
			case 2:
				list[i] = 'button X'; break;
			case 3:
				list[i] = 'button Y'; break;
			case 4:
				list[i] = 'button L1'; break;
			case 5:
				list[i] = 'button R1'; break;
			case 6:
				list[i] = 'button L2'; break;
			case 7:
				list[i] = 'button R2'; break;
			case 8:
				list[i] = 'button Select'; break;
			case 9:
				list[i] = 'button Start'; break;
			case 10:
				list[i] = 'button L push'; break;
			case 11:
				list[i] = 'button R push'; break;
			case 12:
				list[i] = 'dUp'; break;
			case 13:
				list[i] = 'dDown'; break;
			case 14:
				list[i] = 'dLeft'; break;
			case 15:
				list[i] = 'dRight'; break;
		}
	}
	return list;
};

master2015hp.isatSnp.cGetKeyMap = function(key) {
    var list = Object.keys(Input.keyMapper).filter(function(v) {
		return Input.keyMapper[v] == key;
	});//.map(function(v2) {return String.fromCharCode(Number(v2));});
	if (list.length <= 0) return [];
	for (var i = 0; i < list.length; i++) {
		switch(Number(list[i])) {
			case 8:
				list[i] = 'Backspace'; break;
			case 13:
				list[i] = 'Enter'; break;
			case 16:
				list[i] = 'Shift'; break;
			case 17:
				list[i] = 'Ctrl'; break;
			case 27:
				list[i] = 'Esc'; break;
			case 32:
				list[i] = 'Space'; break;
			case 33:
				list[i] = 'PageUp'; break;
			case 34:
				list[i] = 'PageDown'; break;
			case 35:
				list[i] = 'End'; break;
			case 36:
				list[i] = 'Home'; break;
			case 37:
				list[i] = '←'; break;
			case 38:
				list[i] = '↑'; break;
			case 39:
				list[i] = '→'; break;
			case 40:
				list[i] = '↓'; break;
			case 45:
				list[i] = 'Ins'; break;
			case 46:
				list[i] = 'Del'; break;
			case 96:
				list[i] = 'num0'; break;	
			case 97:
				list[i] = 'num1'; break;
			case 98:
				list[i] = 'num2'; break;
			case 99:
				list[i] = 'num3'; break;
			case 100:
				list[i] = 'num4'; break;
			case 101:
				list[i] = 'num5'; break;
			case 102:
				list[i] = 'num6'; break;
			case 103:
				list[i] = 'num7'; break;
			case 104:
				list[i] = 'num8'; break;
			case 105:
				list[i] = 'num9'; break;
			case 110:
				list[i] = '.'; break;
			default:
				list[i] = String.fromCharCode(Number(list[i]));
		}
	}
	return list;
};

master2015hp.isatSnp.getKeyName = function(key) {
	var res = null;
	var list = [];
	if ($gameVariables.value(master2015hp.isatSnp.lastInputDeviceVarId)) {
		list = master2015hp.isatSnp.cGetPadMap(key);
		if (list.length > 0) res = list[0];
		if (ConfigManager._ms2015_lastGPList && ConfigManager._ms2015_lastGPList.hasOwnProperty(key)) res = ConfigManager._ms2015_lastGPList[key];		
	} else {
		list = master2015hp.isatSnp.cGetKeyMap(key);
		if (list.length > 0) {
			if (key == 'ok' && (list.contains('space') || list.contains('SPACE')))
				res = 'SPACE';
			else
				res = list[0];
		}
		if (ConfigManager._ms2015_lastKBList && ConfigManager._ms2015_lastKBList.hasOwnProperty(key)) res = ConfigManager._ms2015_lastKBList[key];
	}
	return res;
};

Input.update = function() {
    master2015hp.isatSnp.b[0].call(this);
	if (!this._ms2015CheckGamePadPressed) {
		this._ms2015CheckGamePadPressed = 1;
		this.checkGamePadPressed();
	} else {
		if (++this._ms2015CheckGamePadPressed > 10) {
			this._ms2015CheckGamePadPressed = null;
		}
	}
};

Input.checkGamePadPressed = function() {
	if (!$gameVariables) return;
	if (master2015hp.isatSnp.gamepadAnyButtonPressed(true)) {
		$gameVariables.setValue(master2015hp.isatSnp.lastInputDeviceVarId, 1);
	} else if (master2015hp.isatSnp.inputAnyKeyPressed()) {
		$gameVariables.setValue(master2015hp.isatSnp.lastInputDeviceVarId, 0);
	}
};

//►hilight all allies target
// Window_Selectable.prototype.forceUpdateCursor = function() {
    // var rect = this.itemRect(0);
	// this.setCursorRect(rect.x, rect.y, this.contents.width, this.contents.height);
// };

//turn off select sprite
BattleManager.endAction = function() {
	master2015hp.isatSnp.b[18].call(this);
	if (this._subject && this._subject.isActor()) SceneManager._scene.highlightAllDisable();
};

Scene_Battle.prototype.startActorCommandSelection = function() {
	master2015hp.isatSnp.b[17].call(this);
	//active currect actor window
    var curActor = BattleManager.actor();
	var exId = (curActor ? curActor.index() : 0);
	var curWindow = this._battleUpgWindList.filter(function(w) {if (w._actor.index() == exId) return true; return false});
	if (curWindow) {
		var w = curWindow[0];
		if (!w.active) {
			w.activate();
			if (w.index() < 0) w.select(0);
		}
	}
};

Scene_Battle.prototype.getScopeCurActor = function() {
	var curActor = BattleManager.actor();
	if (!curActor) return -1;
	var curAction = curActor._actions[0];
	if (!curAction) return -1;
	if (!curAction.item()) return -1;
	return curAction.item().scope;
};

Scene_Battle.prototype.selectActorSelection = function() {
    master2015hp.isatSnp.b[10].call(this);
	var scope = this.getScopeCurActor();
	if (scope == 8) {
		this._updateAllBUW = true;
	} else if (scope == 7 || scope == 9) {
		this._actorWindow.select(this._actorWindow.index());
	}
};

Scene_Battle.prototype.onActorOk = function() {
	master2015hp.isatSnp.b[14].call(this);
	this.highlightAllDisable();
};

Scene_Battle.prototype.onActorCancel = function() {
	master2015hp.isatSnp.b[15].call(this);
	this.highlightAllDisable();
};

//===
Window_BattleActor.prototype.cursorRight = function(wrap) {
	var scope = SceneManager._scene.getScopeCurActor();
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
		if (scope && scope == 9)
			this.select(this.findNextDeadAllyIndex());
		else
			this.select((index + 1) % maxItems);
    }
};

Window_BattleActor.prototype.cursorLeft = function(wrap) {
	var scope = SceneManager._scene.getScopeCurActor();
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
		if (scope && scope == 9)
			this.select(this.findPrevDeadAllyIndex());
		else
			this.select((index - 1 + maxItems) % maxItems);
    }
};

Window_BattleActor.prototype.findNextDeadAllyIndex = function() {
	var res = this.index();
	var id = res + 1;
	var maxItems = this.maxItems();
	for (var i = id; i < maxItems; i++) {
		if ($gameParty.members()[i].isDead()) {
			res = i;
			break;
		}
	}
	return res;
};

Window_BattleActor.prototype.findPrevDeadAllyIndex = function() {
	var res = this.index();
	var id = res - 1;
	for (var i = id; i >= 0; i--) {
		if ($gameParty.members()[i].isDead()) {
			res = i;
			break;
		}
	}
	return res;
};

Window_BattleActor.prototype.select = function(index) {
	var scope = SceneManager._scene.getScopeCurActor();
	master2015hp.isatSnp.b[19].call(this, index);
    if (BattleManager._actorSelectOn) {
		var list = [];
		var actor = this.actor();
		if (actor) list.push(actor);
		if (scope != 7 && scope != 9) {
			if (BattleManager.actor() != actor) list.push(BattleManager.actor());
		}
		
		SceneManager._scene.highlightAllDisable();
		SceneManager._scene.highlightTargetedActor(list);
		SceneManager._scene.resetAllMogCursor();
	}
};

Scene_Battle.prototype.highlightTargetedActor = function(list) {
	list.forEach(function(a) {
		this._battleUpgWindList.forEach(function(w) {
			if (w._actor == a) {
				w.select(0);
			}
		});
	},this);
};

Scene_Battle.prototype.highlightAllDisable = function() {
	var scope = this.getScopeCurActor();
	
	this._updateAllBUW = null;
	this._1timeA = null;
	var curActor = BattleManager.actor();
	var exId = (curActor ? curActor.index() : 0);
	// var curWindow = this._battleUpgWindList.filter(function(w) {if (w._actor.index() == exId) return true; return false});
	this._battleUpgWindList.forEach(function(w) {
		if (scope != 7 && scope != 9) {
			if (curActor) {
				if (w._actor.index() == exId)
					return;
			}
		}
		w.deselect();
		w.deactivate();
	});
};

Scene_Battle.prototype.resetAllMogCursor = function() {
	this._battleUpgWindList.forEach(function(sw) {
		var spr = sw._spriteSelMenu;
		if (spr && spr.visible) {
			spr._border._ani = [0,0,0];
		}
	});
};

Scene_Battle.prototype.updateAllBattleUpgradeWindowsCursor = function() {
	if (this._updateAllBUW) {
		var len = this._battleUpgWindList.length;
		for (var i = 0; i < len; i++) {
			var w = this._battleUpgWindList[i];
			if (w._actor.isAlive() && w.index() < 0) {
				w.select(0);
			}
		}
		
		if (!this._1timeA) {
			this._1timeA = true;
			this.resetAllMogCursor();
		}
	}
};

Scene_Battle.prototype.update = function() {
	master2015hp.isatSnp.b[12].call(this);
	this.updateAllBattleUpgradeWindowsCursor();
};

SpriteSelectionMenu.prototype.updateBorder = function() {
	this.updateSlideAnimation();
    for (var i = 0; i < this._border.length; i++) {
		 if (i === 0) {
			 nx = this._border[i]._org[0] - this._border._ani[0];
			 ny = this._border[i]._org[1] - this._border._ani[0];
		 };
		 if (i === 1) {
			 nx = this._border[i]._org[0] - this._border._ani[0];
			 ny = this._border[i]._org[1] + this._border._ani[0];
		 };
		 if (i === 2) {
			 nx = this._border[i]._org[0] + this._border._ani[0];
			 ny = this._border[i]._org[1] - this._border._ani[0];
		 };
		 if (i === 3) {
			 nx = this._border[i]._org[0] + this._border._ani[0];
			 ny = this._border[i]._org[1] + this._border._ani[0];
		 };
		 // if (!this._window.active) {
			 // nx = this._border[i]._org[0];
			 // ny = this._border[i]._org[1];
		 // };
		 this._border[i].x = nx;
		 this._border[i].y = ny;
	};

};

SpriteSelectionMenu.prototype.rc = function() {
	var def = master2015hp.isatSnp.b[13].call(this);
	if (this.parent instanceof Window_BattleStatusUpgrade) {
		if (SceneManager._scene._updateAllBUW) {
			def = {'x':0, 'y':0, 'width':140, 'height':164, 'type':1};
		}
	}
   return def;
};

/*this must be done within SRD_BattleStatusCustomizer plugin
Window_BattleStatusUpgrade.prototype.update = function() {
	Window_BattleStatus.prototype.update.call(this);
	this.updateRedraw();
	this.updateOpenness();
	this.updatePosition();
	//this.updateMotion();//master2015hp
	this.updateMovement();
	if(_.activeUpdating) this.updateRefreshes();
};
*/
//◄hilight all allies target

//►0001
Window_SkillStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        this.drawText(this._actor.name(), 0, 0, this.width, 'center');
    }
};
Scene_Base.prototype.createCommonEventMenuHelpWindow = function() {
    this._commonEventMenuHelpWindow = new Window_Help2(2);
    this._commonEventMenuHelpWindow.setText('');
    this._commonEventMenuHelpWindow.openness = 0;
    this.addChild(this._commonEventMenuHelpWindow);
};
//-----------------------------------------------------------------------------
// Window_Help2

function Window_Help2() {
    this.initialize.apply(this, arguments);
}

Window_Help2.prototype = Object.create(Window_Help.prototype);
Window_Help2.prototype.constructor = Window_Help2;

Window_Help2.prototype.initialize = function(numLines) {
    Window_Help.prototype.initialize.call(this, numLines);
};

Window_Help2.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_Help2.prototype.refresh = function() {
	var tw = this.textWidthEx(this._text);
	var pad = this.textPadding();
	this.contents.clear();
	var realW = this.width - pad*2;
	var realX = realW/2 - tw/2;
    this.drawTextEx(this._text, realX, 0);
};
//◄0001

//►extra window for item menu
Scene_Item.prototype.create = function() {
    master2015hp.isatSnp.b[9].call(this);
	this.createTopWindow();
};
Scene_Item.prototype.createTopWindow = function() {
	this._titleWindow = new Window_Help2(1);
    this._titleWindow.setText('POCKET');
    this.addWindow(this._titleWindow);
};
//◄extra window for item menu

///msgSkip
Window_Message.prototype.updateInput = function() {
    if (this.pause && this.isFastForward()) {
      this.pause = false;
      this.terminateMessage();
    }
	return master2015hp.isatSnp.b[1].call(this);
};

///animation over portrait patch
Scene_Battle.prototype.createStatusWindow = function() {
	this._battleUpgWindList = [];
	master2015hp.isatSnp.b[11].call(this);
	//collectSatus
	var list = [];
	this._windowLayer.children.forEach(function(w) {
		if (w instanceof Window_BattleStatusUpgrade)
			list.push(w);
	});
	this._battleUpgWindList = list.splice(0);
};

Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
	master2015hp.isatSnp.b[2].call(this, animation, mirror, delay);
	SceneManager._scene.aniOnTop();
};

Spriteset_Battle.prototype.battleFieldDepthCompare = function(a, b) {
	// var cond1 = false;
	// var cond2 = false;
	// var cond3 = false;
	// var cond4 = false;
	// cond1 = a instanceof Sprite && a._horrorFilters;
	// if (cond1) cond2 = Object.keys(a._horrorFilters).length > 0;
	// cond3 = b instanceof Sprite && b._horrorFilters;
	// if (cond3) cond4 = Object.keys(b._horrorFilters).length > 0;
	// if (cond1 && cond2 && b instanceof Window_BattleStatusUpgrade)
		// return 1;
	// else if (a instanceof Window_BattleStatusUpgrade && cond3 && cond4)
		// return -1;
		
	if (a instanceof Window_BattleStatusUpgrade) {
		return -1;
	} else if (b instanceof Window_BattleStatusUpgrade) {
		return 1;
	}
	master2015hp.isatSnp.b[16].call(this, a, b);
};

Scene_Battle.prototype.aniOnTop = function() {
    //move all extra actor window to bottom of battle field
	var list = [];
	var i = 0;
	for (;;) {
		if (i >= this._windowLayer.children.length) break;
		if (this._windowLayer.children[i] instanceof Window_BattleStatusUpgrade) {
			list = list.concat(this._windowLayer.children.splice(i, 1));
			continue;
		}
		i++;
	}
	
	list.forEach(function(w) {
		if (w._actor) {
			var spr = w._actor.battler();
			var xx = w.x + w.width/2;
			var yy = w.y + w.height/2;
			spr.setHome(xx, yy);
		}
		//
		this._spriteset._battleField.addChild(w);
	},this);
};

//horrorFilter above patch
// Spriteset_Battle.prototype.initialize = function() {
    // master2015hp.isatSnp.b[27].call(this);
    // this._horrorFiltersSource = null;
// };

// Scene_Battle.prototype.createSpriteset = function() {
	// master2015hp.isatSnp.b[28].call(this);
	
	// this._ms2015hpHorrorSprite = new Sprite();
	// this._ms2015hpHorrorSprite.setFrame(0, 0, Graphics.width, Graphics.height);
	// this._ms2015hpHorrorSprite._tone = [0, 0, 0, 0];
	// this._ms2015hpHorrorSprite.opaque = true;
	// this._ms2015hpHorrorSprite._horrorFiltersSource = $gameSystem;
	// this.addChild(this._ms2015hpHorrorSprite);
// };

//mog cursor patch
Scene_Battle.prototype.reMogCursorBorder = function() {
	this._windowLayer.children.forEach(function(w) {
		if (w instanceof Window_BattleStatusUpgrade) {
			//
			var id = -1;
			w.children.some(function(b, index) {
				if (b instanceof SpriteSelectionMenu) {
					id = index;
					return true;
				}
			});
			if (id > -1) {
				w.addChild(w.children[id]);
			}
		}
	});
};

Scene_Battle.prototype.start = function() {
    master2015hp.isatSnp.b[3].call(this);
	this.reMogCursorBorder();
};

///L/R Switch
Game_Temp.prototype.reserveCommonEvent = function(commonEventId) {
    master2015hp.isatSnp.b[6].call(this, commonEventId);
	if (commonEventId == 142) {
		$gameTemp._isCmEvMenu = true;
	}
};

Scene_Base.prototype.closeCommonEventMenuWindows = function() {
    master2015hp.isatSnp.b[7].call(this);
	$gameTemp._isCmEvMenu = null;
};

Scene_Base.prototype.start = function() {
	master2015hp.isatSnp.b[4].call(this);
	this.createLRSprite();
};

Scene_Base.prototype.createLRSprite = function() {
	if (this instanceof Scene_KeyConfig) return;
	if (this instanceof Scene_GamepadConfig) return;
	if (this instanceof Scene_Menu) return;
	if (this instanceof Scene_Battle) return;
	if (this instanceof Scene_Title) return;
	if (this instanceof Scene_GameEnd) return;
	if (this instanceof Scene_Options) return;
	if (this instanceof Scene_Save) return;
	if (this instanceof Scene_Load) return;
	if (this instanceof Scene_Map) {
		if ($gameTemp && $gameTemp._isCmEvMenu) {}
		else {
			return;
		}
	}
	
	if ($gameParty && $gameParty.members().length > 1) {
		var ww = master2015hp.isatSnp.lrImageSize;
		var bmR = $gameVariables.value(master2015hp.isatSnp.lastInputDeviceVarId) ? master2015hp.isatSnp.lrImageRPad : master2015hp.isatSnp.lrImageR;
		var bmL = $gameVariables.value(master2015hp.isatSnp.lastInputDeviceVarId) ? master2015hp.isatSnp.lrImageLPad : master2015hp.isatSnp.lrImageL;
		this._lrSpriteLeft = new Sprite_helpLR(bmL, ww/2 + master2015hp.isatSnp.lrOffX, master2015hp.isatSnp.lrOffY);
		this._lrSpriteRight = new Sprite_helpLR(bmR, Graphics.boxWidth - ww/2 - master2015hp.isatSnp.lrOffX, master2015hp.isatSnp.lrOffY);
		this.addChild(this._lrSpriteLeft);
		this.addChild(this._lrSpriteRight);
	}
};

//Sprite Hint ======================================================================
function Sprite_helpLR() {
	this.initialize.apply(this, arguments);
}

Sprite_helpLR.prototype = Object.create(Sprite_Base.prototype);
Sprite_helpLR.prototype.constructor = Sprite_helpLR;

Sprite_helpLR.prototype.initialize = function(bitmap, x, y) {
	Sprite_Base.prototype.initialize.call(this);
	this._pattern = 0;
	this._count = 0;
	this._frames = 1;
	this.loadBitmap(bitmap);
	this.x = x;
	this.y = y;
	this.anchor.x = 0.5;
	this.anchor.y = 0;
};

Sprite_helpLR.prototype.loadBitmap = function(bitmap) {
	this.bitmap = ImageManager.loadSystem(bitmap);
	this.bitmap.addLoadListener(this.getFrames.bind(this));
};

Sprite_helpLR.prototype.getFrames = function() {
	this._frames = this.bitmap.width / master2015hp.isatSnp.lrImageSize;
	this.updateFrame();
};

Sprite_helpLR.prototype.update = function() {
	if (this._frames <= 1) return;
	this._count++;
	if (this._count < master2015hp.isatSnp.lrImageSpeed) {
		return;
	} else {
		this._count = 0;
		this._pattern += 1;
		if (this._pattern >= this._frames) this._pattern = 0;
		this.updateFrame();
	}
};

Sprite_helpLR.prototype.updateFrame = function() {
	var sx = this._pattern * master2015hp.isatSnp.lrImageSize;
	var sy = 0;
	this.setFrame(sx, sy, master2015hp.isatSnp.lrImageSize, this.bitmap.height);
};

//
Scene_Item.prototype.update = function() {
	master2015hp.isatSnp.b[8].call(this);
	if (this._categoryWindow.active) {
		if (Input.isTriggered('pagedown')) {
			this.nextCatg();
			this._categoryWindow.deactivate();
		} else if (Input.isTriggered('pageup')) {
			this.previousCatg();
			this._categoryWindow.deactivate();
		}
	}
};

Scene_Item.prototype.createItemWindow = function() {
    master2015hp.isatSnp.b[5].call(this);
	this._itemWindow.setHandler('pagedown', this.nextCatg.bind(this));
    this._itemWindow.setHandler('pageup',   this.previousCatg.bind(this));
};

Scene_Item.prototype.nextCatg = function() {
    var cid = this._categoryWindow.index();
	cid++;
	if (cid >= this._categoryWindow.maxItems()) cid = 0;
	this._categoryWindow.select(cid);
	this.onCategoryOk();
};

Scene_Item.prototype.previousCatg = function() {
    var cid = this._categoryWindow.index();
	cid--;
	if (cid < 0) cid = this._categoryWindow.maxItems() - 1;
	this._categoryWindow.select(cid);
	this.onCategoryOk();
};

Window_ItemList.prototype.refresh = function() {
    master2015hp.isatSnp.b[33].call(this);
    this.updateHelp();
};

///►Idle Video
if (master2015hp.isatSnp.autoPlayMovie) {
if (master2015hp.isatSnp.idleVideosList.length > 0) {
	
Scene_Title.prototype.initialize = function() {
	master2015hp.isatSnp.b[30].call(this);
	this._idleVideoMode = 0;
	this._idleCount = 0;
	this._idleForceEndVideo = false;
};

Scene_Title.prototype.update = function() {
	master2015hp.isatSnp.b[29].call(this);
	switch (this._idleVideoMode) {
		case 0:
			this.updateIdleVideo();
			break;
		case 1:
			this.setupIdleVideo();
			break;
		case 2:
			this.playingIdleVideo();
			break;
		case 3:
			this.setupIdleVideo(1);
			break;
	}
};

Scene_Title.prototype.updateIdleVideo = function() {
	var cond = !this.isBusy() && !master2015hp.isatSnp.inputAnyKeyPressed();
	if (cond) {
		if (++this._idleCount > master2015hp.isatSnp.idleTime) {
			this._idleVideoMode = 1;
			this._idleCount = 0;
		}
	} else {
		this._idleCount = 0;
	}
};

Scene_Title.prototype.setupIdleVideo = function(mode) {
	this._idleForceEndVideo = false;
	var movieName = master2015hp.isatSnp.idleVideosList[Math.randomInt(master2015hp.isatSnp.idleVideosList.length)];
	Graphics.playVideo('movies/' + movieName + this.getVidExt());
	if (!mode) {
		this._commandWindow.deactivate();
		this._commandWindow.close();
		this.fadeOutAll();
	}
	this._idleVideoMode = 2;
};

Scene_Title.prototype.playingIdleVideo = function() {
	var cond1 = Graphics._video.ended;
	var cond2 = (TouchInput.isTriggered() || TouchInput.isCancelled() ||
		Input.isTriggered('up') || Input.isTriggered('down') || Input.isTriggered('left') || Input.isTriggered('right') || Input.isTriggered('ok') || Input.isTriggered('cancel'));
	if (cond1) {
		if (this._idleForceEndVideo) {
			this._idleVideoMode = 0;
			this.start();
			this._commandWindow.activate();
		} else
			this._idleVideoMode = 3;
		return;
	}
	if (cond2) {
		this._idleForceEndVideo = true;
		Graphics._video.currentTime = Graphics._video.duration || 0;
		Graphics._onVideoEnd();
		return;
	}
};

Scene_Title.prototype.getVidExt = function() {
    if (Graphics.canPlayVideoType('video/webm') && !Utils.isMobileDevice()) {
        return '.webm';
    } else {
        return '.mp4';
    }
};

Window_TitleCommand.prototype.makeCommandList = function() {
	master2015hp.isatSnp.b[31].call(this);
	if (master2015hp.isatSnp.idleVidTitleCommand) {
		this.addCommand(master2015hp.isatSnp.idleVidTitleCommand, 'playIntro');
		this._list.sort(function(a,b) {
			if (a['name'] == 'Quit') return 1;
			if (b['name'] == 'Quit') return -1;
			return 0;
		});
	}
};

Scene_Title.prototype.createCommandWindow = function() {
	master2015hp.isatSnp.b[32].call(this);
	if (master2015hp.isatSnp.idleVidTitleCommand) {
		this._commandWindow.setHandler('playIntro',  this.commandPlayIntro.bind(this));
	}
};

Scene_Title.prototype.commandPlayIntro = function() {
	this.setupIdleVideo();
};

}}
///◄Idle Video

//hide certain actor from using item window
Window_MenuActor.prototype.initialize = function() {
	var excludeActorIdList = master2015hp.isatSnp.hideFromApplyingItemActorList;
	this._data = $gameParty.members().filter(function(a) {
		if (!a) return false;
		if (excludeActorIdList.contains(a._actorId)) return false;
		return true;
	});
    master2015hp.isatSnp.b[34].call(this);
};

Window_MenuActor.prototype.maxItems = function() {
    return this._data.length;
};

Window_MenuActor.prototype.loadImages = function() {
    this._data.forEach(function(actor) {
        ImageManager.reserveFace(actor.faceName());
    }, this);
};

Window_MenuActor.prototype.drawItemImage = function(index) {
    var actor = this._data[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, Window_Base._faceWidth, Window_Base._faceHeight);
    this.changePaintOpacity(false);
};

Window_MenuActor.prototype.drawItemStatus = function(index) {
    var actor = this._data[index];
    var rect = this.itemRect(index);
    var x = rect.x;// + 162;
    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    var width = rect.width - x - this.textPadding();
    this.drawActorSimpleStatus(actor, x, y, width);
};

Window_MenuActor.prototype.processOk = function() {
    if (!this.cursorAll()) {
        $gameParty.setTargetActor(this._data[this.index()]);
    }
    this.callOkHandler();
};

Window_MenuActor.prototype.isCurrentItemEnabled = function() {
    if (this._formationMode) {
        var actor = this._data[this.index()];
        return actor && actor.isFormationChangeOk();
    } else {
        return true;
    }
};

//Re-highlight PROFILE menu
Scene_Menu.prototype.start = function() {
    master2015hp.isatSnp.b[35].call(this);
	if ($gameSwitches.value(master2015hp.isatSnp.highlightProfile)) {
		$gameSwitches.setValue(master2015hp.isatSnp.highlightProfile, false);
		this._commandWindow.select(3);
	}
};

//disable moving parallax
Game_Map.prototype.updateParallax = function() {
	if ($gameSwitches.value(master2015hp.isatSnp.stopParallax)) return;
    master2015hp.isatSnp.b[36].call(this);
};

//►Always wrap message text
Game_Message.prototype.addText = function(text) {
    if ($gameSystem.wordWrap())
		$gameSystem._doWrapMsg = true;
    this.add(text);
};

Window_Message.prototype.setWordWrap = function(text) {
	this._wordWrap = false;
    if ($gameSystem._doWrapMsg) {
		this._wordWrap = true;
		$gameSystem._doWrapMsg = false;
	}
    if (this._wordWrap) {
      var replace = Yanfly.Param.MSGWrapSpace ? ' ' : '';
      text = text.replace(/[\n\r]+/g, replace);
    }
    if (this._wordWrap) {
      text = text.replace(/<(?:BR|line break)>/gi, '\n');
    } else {
      text = text.replace(/<(?:BR|line break)>/gi, '');
    }
    return text;
};

//wrap choice too
Window_ChoiceList.prototype.initialize = function(messageWindow) {
    master2015hp.isatSnp.b[46].call(this, messageWindow);
	this.initChoicesRec();
};

Window_ChoiceList.prototype.initChoicesRec = function() {
	this._choicesRec = {};
	this._choicesRec._doneList = [];
};

Window_ChoiceList.prototype.drawItem = function(index) {
	$gameSystem._doWrapChoice = true;
    master2015hp.isatSnp.b[38].call(this, index);
};

Window_ChoiceList.prototype.setWordWrap = function(text) {
	this._wordWrap = false;
    if ($gameSystem._doWrapChoice) {
		this._wordWrap = true;
		$gameSystem._doWrapChoice = false;
	}
    if (this._wordWrap) {
      var replace = Yanfly.Param.MSGWrapSpace ? ' ' : '';
      text = text.replace(/[\n\r]+/g, replace);
    }
    if (this._wordWrap) {
      text = text.replace(/<(?:BR|line break)>/gi, '\n');
    } else {
      text = text.replace(/<(?:BR|line break)>/gi, '');
    }
    return text;
};

Window_ChoiceList.prototype.processNewLine = function(textState) {
	if (textState.text) {
		var txt = textState.text.replace(/[\u001b\u009b]([^\d\w[ ]]?|[\d\w]+)/g,'');
		if (!this._choicesRec._doneList.contains(txt)) {
			if (this._choicesRec[txt])
				this._choicesRec[txt]++;
			else
				this._choicesRec[txt] = 2;
		}
	}
    Window_Base.prototype.processNewLine.call(this, textState);
};

Window_ChoiceList.prototype.setTopRow = function(row) {
    var scrollY = row.clamp(0, this.maxTopRow()) * this.itemHeight();
	// console.log(scrollY);
    if (this._scrollY !== scrollY) {
        this._scrollY = scrollY;
		//►
		Object.keys(this._choicesRec).forEach(function(key) {
			if (key != '_doneList' && !this._choicesRec._doneList.contains(key))
				this._choicesRec._doneList.push(key);
		},this);
		
        this.refresh();
        this.updateCursor();
		
		if (!this.isCurrentChoiceFullyShown())
			this.setTopRow(row + 1);
    }
};

Window_ChoiceList.prototype.getCurrentRow = function() {
	var id = this.index();
	var lineCount = 0;
	for (var i = 0; i < id; i++) {
		lineCount += this.calcLines(i);
	}
	return lineCount++;
};

Window_ChoiceList.prototype.isCurrentChoiceFullyShown = function() {
	var topRow = this.topRow();
	var maxPageRow = this.maxPageRows();
	var curRow = this.getCurrentRow();
	var maxCurRow = this.calcLines(this.index());
	if (curRow + maxCurRow <= topRow + maxPageRow)
		return true;
	return false;
};

Game_Message.prototype.add = function(text) {
    master2015hp.isatSnp.b[47].call(this, text);
	if (SceneManager._scene._messageWindow)
		SceneManager._scene._messageWindow._choiceWindow.initChoicesRec();//reset
};

Window_ChoiceList.prototype.calcLines = function (index) {
	var choices = $gameMessage.choices();
	// console.log(this._choicesRec);
	// console.log(choices);
	if (this._choicesRec) {
		var str = '';
		Object.keys(this._choicesRec).some(function(key) {
			if (choices[index] && choices[index].contains(key)) {
				str = key;
				return true;
			}
			return false;
		},this);
		if (str) return this._choicesRec[str];
	}
	if(choices[index]) {
		return choices[index].split(/\\n/).length;           
	} else {
		return 0;
	}
};

Window_ChoiceList.prototype.getSelfX = function() {
	var res = 0;
	try {
		res = this.x;
	} catch (error) {
	}
	return res;
};

Window_ChoiceList.prototype.maxChoiceWidth = function() {
	var x = this.getSelfX();
	var maxWidth = this._messageWindow.width - x - this.textPadding() * 6 || 800;
	var initWidth = maxWidth;
	var choices = $gameMessage.choices();
	for (var i = 0; i < choices.length; i++) {
		var lines = choices[i].split(/\\n/);
		for(var j = 0; j < lines.length; j++) {
			var choiceWidth = this.textWidthEx(lines[j]) + this.textPadding() * 2;
			if (initWidth < choiceWidth) {
				initWidth = choiceWidth;
			}
		}
	}
	return Math.min(maxWidth, initWidth);
};

// Window_ChoiceList.prototype.itemRect = function(index) {
	// var rect = new Rectangle();
	// var maxCols = this.maxCols();
	// rect.width = this.itemWidth();
	// if($gameMessage.choices().length != 0){
		// rect.height = this.itemHeight() * this.calcLines(index);
	// } else {
		// rect.height = this.itemHeight();
	// }
	// rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
	// rect.y = this.calcRectY(index) - this._scrollY;
	// console.log(this._scrollY);
	// return rect;
// };

// Window_ChoiceList.prototype.maxRows = function() {
	// return this.calcTotalLines();
// };

// Window_ChoiceList.prototype.drawAllItems = function() {
	// var topIndex = this.topIndex();
	// var index = topIndex;
	// var totalLines = this.lineStart(index) - this.topRow();
	// console.log(totalLines);
	// console.log(this.maxPageItems());
	
	// while(totalLines < this.maxPageItems()){
		// console.log(index);
		// var lines = this.calcLines(index);
		// if(lines > 0) {
			// console.log(index);
			// console.log(this.maxItems());
			// if (index < this.maxItems()) {
				// this.drawItem(index);
			// }
			// totalLines += lines;
			// index++;
		// } else {
			// break;
		// }
	// }
// };

//break Japanese
Window_Base.prototype.checkWordWrap = function(textState) {
	if (!textState) return false;
	if (!this._wordWrap) return false;
	if (textState.text[textState.index] === ' ') {
		var nextSpace = textState.text.indexOf(' ', textState.index + 1);
		var nextBreak = textState.text.indexOf('\n', textState.index + 1);
		if (nextSpace < 0) nextSpace = textState.text.length + 1;
		if (nextBreak > 0) nextSpace = Math.min(nextSpace, nextBreak);
		var word = textState.text.substring(textState.index, nextSpace);
		var size = this.textWidthExCheck(word);
	} else if ("English" === "Japanese") {
		var nextSpace = textState.index + 1;
		var nextBreak = textState.text.indexOf('\n', textState.index + 1);
		if (nextSpace < 0) nextSpace = textState.text.length + 1;
		if (nextBreak > 0) nextSpace = Math.min(nextSpace, nextBreak);
		var word = textState.text.substring(textState.index, nextSpace);
		var size = this.textWidthExCheck(word);
	}
	var res = (size + textState.x > (this.wordwrapWidth() - master2015hp.isatSnp.wordWrapPadX));
	if (res && "English" === "Japanese") textState.index--;
    return res;
};

//Fix SRD translation error
//need to be applied on the SRD file itself
`
SRD.TranslationEngine.parseNoteData = function(data) {
	var updateFields = null;
	data.note.replace(/<(.*)[ ]Translation>((?:(?!<\/)[\s\S])*)<\/(.*)[ ]Translation>/gi, function(match, m1, m2, m3) {
		if(m1 !== m3) return match;
		if(data._tt_translations === undefined) data._tt_translations = {};
		// console.log(m2);
		var pairs = m2.split(/[\r\n]+/);
		pairs.forEach(function(pair) {
			pair.replace(/\[(.*)\]:\n*((?:(?!\\\[.*\])[\s\S])*)\s*/gi, function(match2, name, value) {
					// console.log(match2);
					// console.log(name);
					// console.log(value);
					if(name && value && typeof(data[name]) === 'string') {
					if(value.indexOf('\n', value.length - 1) > 0) {
						value = value.substring(0, value.length - 1);
					}
					if(data._tt_translations[m1] === undefined) data._tt_translations[m1] = {};
					data._tt_translations[m1][name] = value;
					if(updateFields === null) updateFields = [];
					if(!updateFields.contains(name)) updateFields.push(name);
				}
				return match2;
			}.bind(this));
		},this);
		// m2.replace(/\[(.*)\]:\n*((?:(?!\\\[.*\])[\s\S])*)\s*/gi, function(match2, name, value) {
			// console.log(match2);
			// console.log(name);
			// console.log(value);
			// if(name && value && typeof(data[name]) === 'string') {
				// if(value.indexOf('\n', value.length - 1) > 0) {
					// value = value.substring(0, value.length - 1);
				// }
				// if(data._tt_translations[m1] === undefined) data._tt_translations[m1] = {};
				// data._tt_translations[m1][name] = value;
				// if(updateFields === null) updateFields = [];
				// if(!updateFields.contains(name)) updateFields.push(name);
			// }
			// return match2;
		// }.bind(this));
		return match;
	}.bind(this));
	return updateFields;
};
`
//◄Always wrap message text

//fix Hime_HMSChoiceDisplayMode. Also require modification of the original file
Window_Message.prototype.onEndOfText = function() {
	this._recTextState = JsonEx.makeDeepCopy(this._textState);
	master2015hp.isatSnp.b[37].call(this);
};

//►init font setting
for (key in master2015hp.isatSnp.fontList) {
	Graphics.loadFont(key, 'fonts/' + master2015hp.isatSnp.fontList[key]);
}

ConfigManager.refreshAllWindows = function() {
	const scene = SceneManager._scene;
	if(scene && scene._windowLayer) {
		const layer = scene._windowLayer;
		if(!layer.children) return;
		layer.children.forEach(function(win) {
			win.resetFontSettings();
			if(win.refresh) win.refresh();
		})
	}
};

ConfigManager.makeData = function() {
	var config = master2015hp.isatSnp.b[39].call(this);
	config.fontStyle = this.fontStyle;
	return config;
};

ConfigManager.applyData = function(config) {
	master2015hp.isatSnp.b[40].call(this, config);
	this.fontStyle = this.readFontStyle(config, 'fontStyle');
};

ConfigManager.readFontStyle = function(config, name) {
	var value = config[name];
	if (value !== undefined) {
		return value;
	} else {
		return 0;
	}
};

ConfigManager.setFontStyle = function(id) {
	this.fontStyle = id;
};

// Window_Base.prototype.resetFontSettings = function() {
	// master2015hp.isatSnp.b[41].call(this);
	// this.loadOptionsFont();
// };

// Window_Base.prototype.loadOptionsFont = function() {
	// var keyList = Object.keys(master2015hp.isatSnp.fontList);
	// var fontName = keyList[ConfigManager.fontStyle];
	// if ("English" === "Japanese")
		// fontName = 'japanese';
	// else
		// fontName = keyList[0];//default
	
	// ConfigManager.setFontStyle(keyList.indexOf(fontName));
	// this.contents.fontFace = fontName;
// };

Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
	this.loadOptionsFont();
	master2015hp.isatSnp.b[42].call(this, text, x, y, maxWidth, lineHeight, align);
};

Bitmap.prototype.loadOptionsFont = function() {
	var keyList = Object.keys(master2015hp.isatSnp.fontList);
	var fontName = keyList[ConfigManager.fontStyle];
	fontName = "english";
	if (!master2015hp.isatSnp.fontList.hasOwnProperty(fontName))
		fontName = keyList[0];//default
	
	ConfigManager.setFontStyle(keyList.indexOf(fontName));
	this.fontFace = fontName;
};
//◄init font setting

//►reload Items language
Game_System.prototype.reloadItemsLanguage = function() {
    var g = $gameParty.allItems();
	$gameParty.members().forEach(function(actor) {
		if (actor) {
			g = g.concat(actor.equips());
		}
	});
	var lang = 'english';
	if ("English".search(/japanese/ig) > -1)
		lang = 'japanese';
	g.forEach(function(it) {
		if (!it) return;
		if (lang == 'japanese') {
			if (it.note.match(/<Japanese[ ]Translation>((?:(?!<\/)[\s\S])*)<\/Japanese[ ]Translation>/gi)) {
				var data = RegExp.$1.split(/[\r\n]+/);
				data.forEach(function(dat) {
					if (!dat) return;
					if (dat.search(/\[name\][ ]?:[ ]?(\.*)/ig) > -1) {
						it.name = dat.substr(dat.search(':'));
					} else if (dat.search(/\[description\][ ]?:[ ]?(\.*)/ig) > -1) {
						it.description = dat.substr(dat.search(':'));
					}
				});
			}
		} else {
			if (it.baseItemId) {
				var baseItem = DataManager.getDatabase(it)[it.baseItemId];
				it.name = baseItem.name;
				it.description = baseItem.description;
			}
		}
	});
};

Scene_Load.prototype.onLoadSuccess = function() {
	$gameSystem.reloadItemsLanguage();
	master2015hp.isatSnp.b[43].call(this);
};

Yanfly.Param.ItemNoteParse = true;
//◄reload Items language

Window_Options.prototype.refresh = function() {
    master2015hp.isatSnp.b[44].call(this);
	if (SceneManager._scene._categoryWindow)
		SceneManager._scene._categoryWindow.refresh();
};