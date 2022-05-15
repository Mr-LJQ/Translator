import translatePhrase from "./translatePhrase"
import translateSentence from "./translateSentence"
import translateWord, { getCorrectSpelling } from "./translateWord"

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//声明引入
import type { ErrorData, WordData, ExampleSentence } from "./translateWord"
import type { PhraseData } from "./translatePhrase"
import type { SentenceData } from "./translateSentence"

//声明导出
export type TranslationResult = WordData | SentenceData | PhraseData | ErrorData
export type { WordData, SentenceData, PhraseData, ErrorData, ExampleSentence }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//具体实现

export default class Collins_en_cn {
    xhr: XMLHttpRequest | null
    cache: Cache<string, TranslationResult>

    constructor() {
        this.xhr = null
        this.cache = new Cache(20)
    }

    /**
     * 对translateText的包装，为其添加缓存能力
     * @param text 待翻译文本
     */
    async translate(text: string): Promise<TranslationResult> {
        const { cache } = this
        let translation = cache.get(text)
        if (translation) return translation
        let translationResult = await this.translateText(text)
        if (("errorMessage" in translationResult) && !translationResult.cache) return translationResult
        this.cache.set(text, translationResult)
        return translationResult
    }

    /**
     * 词典基于有道翻译网页版，因此需要获取特定的网页DOM
     */
    private async getPageDOM(input: string): Promise<Document> {
        //短时间内快速查询的情况下，如果上一个未返回，则直接中止
        if (this.xhr) this.xhr.abort()
        return new Promise((resolve, reject) => {
            //词典基于有道网页版
            let searchURL = "https://dict.youdao.com/w/" + encodeURIComponent(input)
            let xhr = new XMLHttpRequest()
            this.xhr = xhr
            xhr.open("GET", searchURL)
            xhr.responseType = "document";
            xhr.timeout = 6000;
            xhr.addEventListener("load", () => {
                if (xhr.status < 200 || xhr.status >= 400) reject(`请求错误,状态码：${xhr.status}，原因：${xhr.statusText}`);
                resolve(xhr.response);
            });
            xhr.addEventListener("error", () => {
                reject(`网络连接错误，请检查网络连接状态`);
            });
            xhr.addEventListener("timeout", () => {
                reject("请求超时,请再次尝试或查看网络连接状态");
            });
            xhr.addEventListener("abort", () => {
                reject("请求被取消")
            })
            xhr.send(null);
        });
    }

    /**
       * 对text进行翻译，获取翻译数据
       * @param text 需要进行翻译的文本
       */
    private async translateText(text: string): Promise<TranslationResult> {
        return {
            "word": "set",
            "star_amount": 5,
            "translations": [
                "v.  放，置；使开始；把故事情节安排在；设置；摆放餐具；镶嵌；安排；树立；布置；凝固；使现出坚定的表情；固定发型；把（断骨）复位；排版；为……谱曲；落（下）；布置（戏剧、电影或电视节目的布景）；（断骨）愈合",
                "n. 一组（类似的东西）；一组（配套使用的东西）；一伙（或一帮、一群）人；电视机；布景 ；舞台；（网球、排球比赛等的）盘；集；一组歌曲（或乐曲）；（在某学科上能力相当的）一批学生 ；（尤指坚定的）姿势；头发的定型；凝固；兽穴；（供移植的）秧苗",
                "adj. 位于（或处于）……的；安排好的；固定的；套（餐）；有可能的；不自然的",
                "【名】 （Set）（瑞、以）塞特（人名）"
            ],
            "phonetic": {
                "am": "美[set]",
                "en": "英[set]",
                "am_audio": "https://dict.youdao.com/dictvoice?audio=set&type=2",
                "en_audio": "https://dict.youdao.com/dictvoice?audio=set&type=1"
            },
            "translationList": [
                {
                    "part_of_speech": "N-COUNT",
                    "definition": "A <b>set</b> <b>of</b> things is a number of things that belong together or that are thought of as a group.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=A%20set%20of%20things%20is%20a%20number%20of%20things%20that%20belong%20together%20or%20that%20are%20thought%20of%20as%20a%20group.&le=eng",
                    "translation": "套; 系列",
                    "example_sentences": [
                        {
                            "example_sentence": "There must be one set of laws for the whole of the country.",
                            "example_sentence_translation": "必须有一套适用于全国的法律。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=There%20must%20be%20one%20set%20of%20laws%20for%20the%20whole%20of%20the%20country.&le=eng"
                        },
                        {
                            "example_sentence": "The mattress and base are normally bought as a set.",
                            "example_sentence_translation": "床垫和床基通常成套购买。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=The%20mattress%20and%20base%20are%20normally%20bought%20as%20a%20set.&le=eng"
                        },
                        {
                            "example_sentence": "...a chess set.",
                            "example_sentence_translation": "…一副国际象棋。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=...a%20chess%20set.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "N-COUNT",
                    "definition": "In tennis, a <b>set</b> is one of the groups of six or more games that form part of a match.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=In%20tennis%2C%20a%20set%20is%20one%20of%20the%20groups%20of%20six%20or%20more%20games%20that%20form%20part%20of%20a%20match.&le=eng",
                    "translation": "(网球赛的) 一盘",
                    "example_sentences": [
                        {
                            "example_sentence": "Graf was leading 5-1 in the first set.",
                            "example_sentence_translation": "格拉夫在首盘比赛中以5-1领先。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=Graf%20was%20leading%205-1%20in%20the%20first%20set.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "N-COUNT",
                    "definition": "In mathematics, a <b>set</b> is a group of mathematical quantities that have some characteristic in common.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=In%20mathematics%2C%20a%20set%20is%20a%20group%20of%20mathematical%20quantities%20that%20have%20some%20characteristic%20in%20common.&le=eng",
                    "translation": "集合",
                    "example_sentences": [
                        {
                            "example_sentence": "...the field of set theory.",
                            "example_sentence_translation": "…集合论领域。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=...the%20field%20of%20set%20theory.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "N-COUNT",
                    "definition": "The <b>set</b> for a play, movie, or television show is the furniture and scenery that is on the stage when the play is being performed or in the studio where filming takes place.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=The%20set%20for%20a%20play%2C%20movie%2C%20or%20television%20show%20is%20the%20furniture%20and%20scenery%20that%20is%20on%20the%20stage%20when%20the%20play%20is%20being%20performed%20or%20in%20the%20studio%20where%20filming%20takes%20place.&le=eng",
                    "translation": "(话剧的) 布景; (电影的) 摄影棚; 拍片现场",
                    "example_sentences": [
                        {
                            "example_sentence": "From the first moment he got on the set, he wanted to be a director too.",
                            "example_sentence_translation": "从踏进摄影棚的第一刻起，他就也想成为一名导演。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=From%20the%20first%20moment%20he%20got%20on%20the%20set%2C%20he%20wanted%20to%20be%20a%20director%20too.&le=eng"
                        },
                        {
                            "example_sentence": "He achieved fame for his stage sets for the Folies Bergeres.",
                            "example_sentence_translation": "他因为为《疯狂的藤椅》设计舞台布景而一举成名。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=He%20achieved%20fame%20for%20his%20stage%20sets%20for%20the%20Folies%20Bergeres.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "N-COUNT",
                    "definition": "A <b>set</b> is an appliance that receives television or radio signals. For example, a television set is a television.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=A%20set%20is%20an%20appliance%20that%20receives%20television%20or%20radio%20signals.%20For%20example%2C%20a%20television%20set%20is%20a%20television.&le=eng",
                    "translation": "电器装置 (如电视机、收音机)",
                    "example_sentences": [
                        {
                            "example_sentence": "Children spend so much time in front of the television set.",
                            "example_sentence_translation": "孩子们在电视机前花的时间太多了。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=Children%20spend%20so%20much%20time%20in%20front%20of%20the%20television%20set.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-T",
                    "definition": "If you <b>set</b> something somewhere, you put it there, especially in a careful or deliberate way.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20you%20set%20something%20somewhere%2C%20you%20put%20it%20there%2C%20especially%20in%20a%20careful%20or%20deliberate%20way.&le=eng",
                    "translation": "(小心地) 放置",
                    "example_sentences": [
                        {
                            "example_sentence": "He took the case out of her hand and set it on the floor.",
                            "example_sentence_translation": "他从她手中接过箱子并置于地板上。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=He%20took%20the%20case%20out%20of%20her%20hand%20and%20set%20it%20on%20the%20floor.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "ADJ",
                    "definition": "If something is <b>set</b> in a particular place or position, it is in that place or position.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20something%20is%20set%20in%20a%20particular%20place%20or%20position%2C%20it%20is%20in%20that%20place%20or%20position.&le=eng",
                    "translation": "处于…的; 位于…的",
                    "example_sentences": [
                        {
                            "example_sentence": "The castle is set in 25 acres of beautiful grounds.",
                            "example_sentence_translation": "城堡坐落于方圆25英亩的宜人场地。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=The%20castle%20is%20set%20in%2025%20acres%20of%20beautiful%20grounds.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "ADJ",
                    "definition": "If something is <b>set</b> <b>into</b> a surface, it is fixed there and does not stick out.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20something%20is%20set%20into%20a%20surface%2C%20it%20is%20fixed%20there%20and%20does%20not%20stick%20out.&le=eng",
                    "translation": "嵌入的",
                    "example_sentences": [
                        {
                            "example_sentence": "The man unlocked a gate set in a high wall and let me through.",
                            "example_sentence_translation": "那人打开砌在高墙中的门，放我过去了。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=The%20man%20unlocked%20a%20gate%20set%20in%20a%20high%20wall%20and%20let%20me%20through.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-T",
                    "definition": "You can use <b>set</b> to say that a person or thing causes another person or thing to be in a particular condition or situation. For example, to <b>set</b> someone free means to cause them to be free, and to <b>set</b> something going means to cause it to start working.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=You%20can%20use%20set%20to%20say%20that%20a%20person%20or%20thing%20causes%20another%20person%20or%20thing%20to%20be%20in%20a%20particular%20condition%20or%20situation.%20For%20example%2C%20to%20set%20someone%20free%20means%20to%20cause%20them%20to%20be%20free%2C%20and%20to%20set%20something%20going%20means%20to%20cause%20it%20to%20start%20working.&le=eng",
                    "translation": "使…处于某种状况; 使开始",
                    "example_sentences": [
                        {
                            "example_sentence": "Set the kitchen timer going.",
                            "example_sentence_translation": "启动厨房定时器。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=Set%20the%20kitchen%20timer%20going.&le=eng"
                        },
                        {
                            "example_sentence": "Dozens of people have been injured and many vehicles set on fire.",
                            "example_sentence_translation": "已经有几十人受伤，很多车辆被放火焚烧。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=Dozens%20of%20people%20have%20been%20injured%20and%20many%20vehicles%20set%20on%20fire.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-T",
                    "definition": "When you <b>set</b> a clock or control, you adjust it to a particular point or level.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=When%20you%20set%20a%20clock%20or%20control%2C%20you%20adjust%20it%20to%20a%20particular%20point%20or%20level.&le=eng",
                    "translation": "拨; 调",
                    "example_sentences": [
                        {
                            "example_sentence": "Set the volume as high as possible.",
                            "example_sentence_translation": "把音量尽量调大。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=Set%20the%20volume%20as%20high%20as%20possible.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-T",
                    "definition": "If you <b>set</b> a date, price, goal, or level, you decide what it will be.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20you%20set%20a%20date%2C%20price%2C%20goal%2C%20or%20level%2C%20you%20decide%20what%20it%20will%20be.&le=eng",
                    "translation": "决定; 确定",
                    "example_sentences": [
                        {
                            "example_sentence": "The conference chairman has set a deadline of noon tomorrow.",
                            "example_sentence_translation": "会议主席设定明天中午为最后期限。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=The%20conference%20chairman%20has%20set%20a%20deadline%20of%20noon%20tomorrow.&le=eng"
                        },
                        {
                            "example_sentence": "A date will be set for a future meeting.",
                            "example_sentence_translation": "将为未来的会议确定一个日期。.",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=A%20date%20will%20be%20set%20for%20a%20future%20meeting.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-T",
                    "definition": "If you <b>set</b> a certain value <b>on</b> something, you think it has that value.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20you%20set%20a%20certain%20value%20on%20something%2C%20you%20think%20it%20has%20that%20value.&le=eng",
                    "translation": "确定",
                    "example_sentences": [
                        {
                            "example_sentence": "She sets a high value on autonomy.",
                            "example_sentence_translation": "她高度重视自主权。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=She%20sets%20a%20high%20value%20on%20autonomy.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-T",
                    "definition": "If you <b>set</b> something such as a record, an example, or a precedent, you do something that people will want to copy or try to achieve.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20you%20set%20something%20such%20as%20a%20record%2C%20an%20example%2C%20or%20a%20precedent%2C%20you%20do%20something%20that%20people%20will%20want%20to%20copy%20or%20try%20to%20achieve.&le=eng",
                    "translation": "树立 (样板)",
                    "example_sentences": [
                        {
                            "example_sentence": "Legal experts said her case would not set a precedent because it was an out-of-court settlement.",
                            "example_sentence_translation": "法律专家说她的案子不会开创先例，因为是庭外和解。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=Legal%20experts%20said%20her%20case%20would%20not%20set%20a%20precedent%20because%20it%20was%20an%20out-of-court%20settlement.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-T",
                    "definition": "If someone <b>sets</b> you a task or aim or if you <b>set</b> <b>yourself</b> a task or aim, you need to succeed in doing it.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20someone%20sets%20you%20a%20task%20or%20aim%20or%20if%20you%20set%20yourself%20a%20task%20or%20aim%2C%20you%20need%20to%20succeed%20in%20doing%20it.&le=eng",
                    "translation": "分派; 制订",
                    "example_sentences": [
                        {
                            "example_sentence": "I have to plan my academic work very rigidly and set myself clear objectives.",
                            "example_sentence_translation": "我必须给我的学术工作制订非常严格的计划，并给自己规定明确的目标。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=I%20have%20to%20plan%20my%20academic%20work%20very%20rigidly%20and%20set%20myself%20clear%20objectives.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "ADJ",
                    "definition": "You use <b>set</b> to describe something which is fixed and cannot be changed.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=You%20use%20set%20to%20describe%20something%20which%20is%20fixed%20and%20cannot%20be%20changed.&le=eng",
                    "translation": "固定不变的",
                    "example_sentences": [
                        {
                            "example_sentence": "A set period of fasting is supposed to bring us closer to godliness.",
                            "example_sentence_translation": "通常认为一段固定的斋戒期可以使我们更虔诚。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=A%20set%20period%20of%20fasting%20is%20supposed%20to%20bring%20us%20closer%20to%20godliness.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "ADJ",
                    "definition": "A <b>set</b> book must be studied by students taking a particular course.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=A%20set%20book%20must%20be%20studied%20by%20students%20taking%20a%20particular%20course.&le=eng",
                    "translation": "指定的"
                },
                {
                    "part_of_speech": "ADJ",
                    "definition": "If a play, movie, or story is <b>set</b> in a particular place or period of time, the events in it take place in that place or period.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20a%20play%2C%20movie%2C%20or%20story%20is%20set%20in%20a%20particular%20place%20or%20period%20of%20time%2C%20the%20events%20in%20it%20take%20place%20in%20that%20place%20or%20period.&le=eng",
                    "translation": "以…为背景的",
                    "example_sentences": [
                        {
                            "example_sentence": "The play is set in a small Midwestern town.",
                            "example_sentence_translation": "这出戏是以中西部的一个小城镇为背景的。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=The%20play%20is%20set%20in%20a%20small%20Midwestern%20town.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "ADJ",
                    "definition": "If you are <b>set</b> <b>to</b> do something, you are ready to do it or are likely to do it. If something is <b>set</b> <b>to</b> happen, it is about to happen or likely to happen.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20you%20are%20set%20to%20do%20something%2C%20you%20are%20ready%20to%20do%20it%20or%20are%20likely%20to%20do%20it.%20If%20something%20is%20set%20to%20happen%2C%20it%20is%20about%20to%20happen%20or%20likely%20to%20happen.&le=eng",
                    "translation": "作好准备的; 有可能的",
                    "example_sentences": [
                        {
                            "example_sentence": "Roberto Baggio was set to become one of the greatest players of all time.",
                            "example_sentence_translation": "罗伯特·巴乔有可能成为有史以来最伟大的球星之一。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=Roberto%20Baggio%20was%20set%20to%20become%20one%20of%20the%20greatest%20players%20of%20all%20time.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "ADJ",
                    "definition": "If you are <b>set on</b> something, you are strongly determined to do or have it. If you are <b>set against</b> something, you are strongly determined not to do or have it.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20you%20are%20set%20on%20something%2C%20you%20are%20strongly%20determined%20to%20do%20or%20have%20it.%20If%20you%20are%20set%20against%20something%2C%20you%20are%20strongly%20determined%20not%20to%20do%20or%20have%20it.&le=eng",
                    "translation": "执意的",
                    "example_sentences": [
                        {
                            "example_sentence": "She was set on going to an all-girls school.",
                            "example_sentence_translation": "她执意要去一所女子学校读书。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=She%20was%20set%20on%20going%20to%20an%20all-girls%20school.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-I",
                    "definition": "When something such as jelly, melted plastic, or cement <b>sets</b>, it becomes firm or hard.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=When%20something%20such%20as%20jelly%2C%20melted%20plastic%2C%20or%20cement%20sets%2C%20it%20becomes%20firm%20or%20hard.&le=eng",
                    "translation": "凝固; 凝结",
                    "example_sentences": [
                        {
                            "example_sentence": "You can add ingredients to these desserts as they begin to set.",
                            "example_sentence_translation": "你可以在那些甜点快凝固时添加一些成分。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=You%20can%20add%20ingredients%20to%20these%20desserts%20as%20they%20begin%20to%20set.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-I",
                    "definition": "When the sun <b>sets</b>, it goes below the horizon.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=When%20the%20sun%20sets%2C%20it%20goes%20below%20the%20horizon.&le=eng",
                    "translation": "(太阳) 落下",
                    "example_sentences": [
                        {
                            "example_sentence": "They watched the sun set behind the distant dales.",
                            "example_sentence_translation": "他们远观夕阳落下山谷。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=They%20watched%20the%20sun%20set%20behind%20the%20distant%20dales.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-T",
                    "definition": "To <b>set</b> a trap means to prepare it to catch someone or something.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=To%20set%20a%20trap%20means%20to%20prepare%20it%20to%20catch%20someone%20or%20something.&le=eng",
                    "translation": "设置",
                    "example_sentences": [
                        {
                            "example_sentence": "He seemed to think I was setting some sort of trap for him.",
                            "example_sentence_translation": "他似乎认为我正给他设置某种陷阱。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=He%20seemed%20to%20think%20I%20was%20setting%20some%20sort%20of%20trap%20for%20him.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-T",
                    "definition": "When someone <b>sets</b> the table, they prepare it for a meal by putting plates and cutlery on it.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=When%20someone%20sets%20the%20table%2C%20they%20prepare%20it%20for%20a%20meal%20by%20putting%20plates%20and%20cutlery%20on%20it.&le=eng",
                    "translation": "摆放",
                    "example_sentences": [
                        {
                            "example_sentence": "One would shop and cook, another would set the table and another would wash up.",
                            "example_sentence_translation": "一人会购物和烹饪，一人摆桌子，另外一人洗餐具。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=One%20would%20shop%20and%20cook%2C%20another%20would%20set%20the%20table%20and%20another%20would%20wash%20up.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "V-T",
                    "definition": "If someone <b>sets</b> a poem or a piece of writing <b>to</b> music, they write music for the words to be sung to.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20someone%20sets%20a%20poem%20or%20a%20piece%20of%20writing%20to%20music%2C%20they%20write%20music%20for%20the%20words%20to%20be%20sung%20to.&le=eng",
                    "translation": "为…谱曲; 为…配乐",
                    "example_sentences": [
                        {
                            "example_sentence": "He has attracted much interest by setting ancient religious texts to music.",
                            "example_sentence_translation": "他为古代宗教经文谱曲，引起了很多人的兴趣。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=He%20has%20attracted%20much%20interest%20by%20setting%20ancient%20religious%20texts%20to%20music.&le=eng"
                        }
                    ]
                },
                {
                    "part_of_speech": "PHRASE",
                    "definition": "If someone <b>sets the scene</b> or <b>sets the stage</b> <b>for</b> an event to take place, they make preparations so that it can take place.",
                    "definition_audio": "https://dict.youdao.com/dictvoice?audio=If%20someone%20sets%20the%20scene%20or%20sets%20the%20stage%20for%20an%20event%20to%20take%20place%2C%20they%20make%20preparations%20so%20that%20it%20can%20take%20place.&le=eng",
                    "translation": "为…作好准备; 为…创造条件",
                    "example_sentences": [
                        {
                            "example_sentence": "The Democratic convention has set the scene for a ferocious election campaign this autumn.",
                            "example_sentence_translation": "民主党全国代表大会已为今秋激烈的竞选活动作好了准备。",
                            "example_audio": "https://dict.youdao.com/dictvoice?audio=The%20Democratic%20convention%20has%20set%20the%20scene%20for%20a%20ferocious%20election%20campaign%20this%20autumn.&le=eng"
                        }
                    ]
                }
            ]
        }
        let result: TranslationResult
        try {
            //去除驼峰
            text = removeHump(text)
            const dom = await this.getPageDOM(text)

            //如果存在空格，则认为其为多个单词组合的句子、词组
            if (/\s/g.test(text)) {
                result = this.translateWords(dom)
            } else {
                result = translateWord(dom)
            }
        } catch (err: any) {
            let errorMessage = err
            //捕获语法错误
            if (err instanceof Error) errorMessage = err.message
            //对自定义的错误格式进行处理
            result = { errorMessage, cache: false }
        }
        return result
    }
    translateWords(dom: Document): SentenceData | PhraseData | ErrorData {
        //情况一：待翻译的是短语
        const translatedPhrase = translatePhrase(dom)
        if (translatedPhrase) return translatedPhrase

        //情况二:待翻译的是句子
        const translatedSentence = translateSentence(dom)
        if (translatedSentence) return translatedSentence

        //情况三：拼写出错，推测正确的拼写
        let possibleSpelling = getCorrectSpelling(dom)
        if (possibleSpelling) {
            return { cache: true, possibleSpelling, errorMessage: "拼写存在错误" }
        }
        //情况四：无任何翻译
        return { errorMessage: "没有查找到任何翻译", cache: false }
    }
}


/**
 * 纯函数，去除驼峰使单词回归正常语法
 */
function removeHump(text: string) {
    //匹配驼峰
    let camel = /([a-z])([A-Z])([a-z])/g;

    return text
        .replace(camel, function (_, $1, $2, $3) {
            return $1 + " " + $2.toLowerCase() + $3;
        })
}

//缓存类
class Cache<K, V> {
    private map: Map<K, V>
    private max: number
    constructor(max: number) {
        this.map = new Map();
        this.max = max;
    }
    set(key: K, value: V) {
        const map = this.map;
        const max = this.max;
        if (map.size >= max) {
            map.delete(map.keys().next().value);
        }
        return map.set(key, value);
    }
    get(key: K) {
        return this.map.get(key)
    }
}

