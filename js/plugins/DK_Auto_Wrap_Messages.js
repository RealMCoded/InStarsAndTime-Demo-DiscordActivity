/*
Title: Auto Wrap Messages
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 1.1.0
Release: 13.08.2020
First release: 13.08.2020
*/

/*ru
Название: Автоматический Перенос Сообщений
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 1.1.0
Релиз: 13.08.2020
Первый релиз: 13.08.2020
*/

/*:
* @plugindesc v.1.1.0 Auto wrap messages
* @author DKPlugins
* @url https://dk-plugins.ru
* @target MZ
* @help

 ### Info about plugin ###
 Title: DK_Auto_Wrap_Messages
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 1.1.0
 Release: 13.08.2020
 First release: 13.08.2020

 ###=========================================================================
 ## Support
 ###=========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins

 ###=========================================================================
 ## Compatibility
 ###=========================================================================
 RPG Maker MV: 1.6+
 RPG Maker MZ: 1.0+

 ###===========================================================================
 ## License and terms of use
 ###===========================================================================
 Recent information about the terms of use: https://dk-plugins.ru/terms-of-use

 You can:
 -Free to use the plugin for your commercial and non commercial projects.
 -Translate the plugin to other languages (inform if you do this)
 -Change the plugin code, but you must specify a link to the original plugin

 You can't:
 -Delete or change any information about the plugin (Title, authorship, contact information, version and release)

*/

/*:ru
* @plugindesc v.1.1.0 Автоматический перенос сообщений
* @author DKPlugins
* @url https://dk-plugins.ru
* @target MZ
* @help

 ### Информация о плагине ###
 Название: DK_Auto_Wrap_Messages
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 1.1.0
 Релиз: 13.08.2020
 Первый релиз: 13.08.2020

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins

 ###=========================================================================
 ## Совместимость
 ###=========================================================================
 RPG Maker MV: 1.6+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Лицензии и правила использования плагина
 ###=========================================================================
 Актуальная информация о правилах использования: https://dk-plugins.ru/terms-of-use

 Вы можете:
 -Бесплатно использовать данный плагин в некоммерческих и коммерческих проектах
 -Переводить плагин на другие языки (сообщите мне, если Вы перевели плагин на другой язык)
 -Изменять код плагина, но Вы обязаны указать ссылку на оригинальный плагин

 Вы не можете:
 -Убирать или изменять любую информацию о плагине (Название, авторство, контактная информация, версия и дата релиза)

*/

'use strict';

var Imported = Imported || {};
Imported.DK_Auto_Wrap_Messages = '1.1.0';

//===========================================================================
// Window_Base
//===========================================================================

Window_Base.prototype.getWrappedText = function(text, maxWidth = this.contents.width) {
    if (text === '' || text == null) {
        return '';
    }

    text = String(text).split('\n').join(' ');

    const spaceWidth = this.textWidth(' ');
    let result = '';

    const getWordWidth = (word) => {
        const iconRegex = /\x1bi\[(\d+)\]/i;
        let width = 0;
        let text = word.replace(/\x1bc\[(\d+)\]/gi, '')
            .replace(/\x1b{/gi, '')
            .replace(/\x1b}/gi, '')
            .replace(/\\f/gi, '')
            .replace(/\x1b\$/gi, '')
            .replace(/\x1b\./gi, '')
            .replace(/\x1b!/gi, '')
            .replace(/\x1b>/gi, '')
            .replace(/\x1b</gi, '')
            .replace(/\x1b\^/gi, '');

        if (Imported['DKTools_Localization']) {
            text = text.replace(/\x1blanguage/gi, DKTools.Localization.language);
        }

        if (Imported['YEP_MessageCore']) {
            text = text.replace(/\x1bFR/gi, '')
                .replace(/\x1bFB/gi, '')
                .replace(/\x1bFI/gi, '')
                .replace(/<(?:WordWrap)>/gi, '');
        }

        if (Imported['VisuMZ_1_MessageCore']) {
            text = text.replace(/bold\[(\d+)\]/gi, '')
                        .replace(/italic\[(\d+)\]/gi, '');
        }

        while (text.match(iconRegex)) {
            width += Utils.RPGMAKER_NAME === 'MV' ?
                Window_Base._iconWidth + 4 : ImageManager.iconWidth + 4;
            text = text.replace(iconRegex, '');
        }

        if (Imported['YEP_Message_Core']) {
            const regex = [
                { regex: /\x1bII\[(\d+)\]/i, database: $dataItems },
                { regex: /\x1bIW\[(\d+)\]/i, database: $dataWeapons },
                { regex: /\x1bIA\[(\d+)\]/i, database: $dataArmors },
                { regex: /\x1bIS\[(\d+)\]/i, database: $dataSkills },
                { regex: /\x1bIT\[(\d+)\]/i, database: $dataStates },
            ];

            regex.forEach((data) => {
                while (text.match(data.regex)) {
                    width += Window_Base._iconWidth + this.textWidth(data.database[RegExp.$1].name);
                    text = text.replace(data.regex, '');
                }
            });
        }

        return this.textWidth(text) + width;
    }

    const words = text.split(' ');
    let spaceLeft = maxWidth;

    for (let j = 0; j < words.length; j++) {
        const word = words[j];
        const wordWidth = getWordWidth(word);
        let wordWidthWithSpace = wordWidth + spaceWidth;

        if (wordWidth === 0) {
            wordWidthWithSpace -= spaceWidth;
        }

        if (j === 0 || wordWidthWithSpace > spaceLeft) {
            if (j > 0) {
                result += '\n';
            }

            result += word;
            spaceLeft = maxWidth - wordWidth;
        } else {
            spaceLeft -= wordWidthWithSpace;
            result += ' ' + word;
        }
    }

    return result;
};

//===========================================================================
// Window_Message
//===========================================================================

if (Utils.RPGMAKER_NAME === 'MV') {

    const MessagesWrap_Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        MessagesWrap_Window_Message_startMessage.apply(this, arguments);

        this._textState.text = this.getWrappedText(
            this.convertEscapeCharacters($gameMessage.allText()),
            this.contents.width - this.newLineX());

        this.newPage(this._textState);
    };

} else {

    const MessagesWrap_Window_Message_createTextState = Window_Message.prototype.createTextState;
    Window_Message.prototype.createTextState = function(text, x, y, width) {
        const textState = MessagesWrap_Window_Message_createTextState.apply(this, arguments);

        textState.text = this.getWrappedText(
            textState.text, this.contents.width - this.newLineX(textState));
        textState.height = this.calcTextHeight(textState);
        textState.buffer = this.createTextBuffer(textState.rtl);

        return textState;
    }
}
