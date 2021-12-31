const { uid } = require('uid')
const isEmpty = require('lodash.isempty')
const { XMLBuilder } = require('fast-xml-parser')

/**
string	boolean
hexBinary	base64Binary
hexFloat	base64Float
partialDate	partialTime
partialDateTime	intervalDateTime
durationDateTime	incompleteDateTime
URI
*/

/**
ItemDataString	ItemDataInteger	ItemDataFloat	ItemDataDate	ItemDataTime
ItemDataDatetime	ItemDataText	ItemDataHexBinary	ItemDataBase64Binary	ItemDataHexFloat
ItemDataHexBase64Float	ItemDataPartialDate	ItemDataPartialTime	ItemDataPartialDatetime	ItemDataDurationDatetime
ItemDataIntervalDatetime	ItemDataIncompleteDatetime	ItemDataURI		
*/

const TYPES = {
    STUDY_EVENT: 'StudyEvent',
    FORM: 'Form',
    ITEM_GROUP: 'ItemGroup',
    ITEM: 'Item',
    CODE_LIST: 'CodeList',
    FILE: 'File',
    STUDY: 'Study',
    META_DATA_VERSION: 'MetaDataVersion',
    LOCATION: 'Location',
    SUBJECT_KEY: 'SubjectKey',
}

const DATA_TYPES = {
    TEXT: 'text',
    DATE: 'date',
    BOOLEAN: 'boolean',
    INTEGER: 'integer',
    FLOAT: 'float',
}

function genOID(node) {
    let { type } = node
    return uid(10)
}

const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    suppressEmptyNode: true,
})

let StudyName = 'MA-PC-II-004'
let StudyDescription = 'MA-PC-II-004 from edocyun'
let ProtocolName = 'MA-PC-II-004'
let CreationDateTime = '2021-12-10T12:40:42+08:00'
let MetaDataVersionName = 'version4'
let LocationName = '上海交通大学医学院附属仁济医院'
let LocationOID = genOID({ type: TYPES.LOCATION })
let StudyOID = genOID({ type: TYPES.STUDY })
let MetaDataVersionOID = genOID({ type: TYPES.META_DATA_VERSION })

let TARGET = {
    "ODM": {
        "AdminData": {
            "Location": {
                "@_OID": LocationOID,
                "@_Name": LocationName,
                "@_LocationType": "Site"
            }
        },
        "@_xmlns": "http://www.cdisc.org/ns/odm/v1.3",
        "@_FileType": "Snapshot",
        "@_FileOID": genOID({ type: TYPES.FILE }),
        "@_CreationDateTime": CreationDateTime,
        "@_ODMVersion": "1",
        "Study": {
            "@_OID": StudyOID,
            "GlobalVariables": {
                "StudyName": StudyName,
                "StudyDescription": StudyDescription,
                "ProtocolName": ProtocolName
            },
            "BasicDefinitions": "",
            "MetaDataVersion": {
                "@_OID": MetaDataVersionOID,
                "@_Name": MetaDataVersionName,
                "Protocol": {
                    "StudyEventRef": []
                },
                "StudyEventDef": [],
                "FormDef": [],
                "ItemGroupDef": [],
                "ItemDef": [],
                "CodeList": [],
            },
        },
        "ClinicalData": {
            "SubjectData": {
                "SiteRef": {
                    "@_LocationOID": LocationOID
                },
                "@_SubjectKey": genOID({ type: TYPES.SUBJECT_KEY }),
                "@_TransactionType": "Insert",
                "StudyEventData": [],
            },
            "@_StudyOID": StudyOID,
            "@_MetaDataVersionOID": MetaDataVersionOID,
        },
    }
}
let { StudyEventData } = TARGET.ODM.ClinicalData.SubjectData
let { MetaDataVersion } = TARGET.ODM.Study
let {
    Protocol,
    StudyEventDef,
    FormDef,
    ItemGroupDef,
    ItemDef,
    CodeList,
} = MetaDataVersion

let tpl = {
    name: '',
    children: [
        {
            name: 'StudyEvent01',
            desc: '',
            children: [
                {
                    name: 'Form01',
                    desc: '',
                    children: [
                        {
                            name: 'ItemGroup11',
                            desc: '',
                            children: [
                                {
                                    name: 'Item01', value: 'value1', desc: '', data_type: 'text', is_array: false
                                },
                                {
                                    name: 'Item02',
                                    data_type: 'text',
                                    desc: '',
                                    value: 'value',
                                    is_array: true,
                                    options: [
                                        {
                                            label: 'label1', value: 'value1'
                                        },
                                        {
                                            label: 'label2', value: 'value2'
                                        },
                                        {
                                            label: 'label3', value: 'value3'
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'ItemGroup12',
                            children: [
                                {
                                    name: 'Item01', value: 'value2', desc: '', data_type: 'text', is_array: false
                                },
                                {
                                    name: 'Item02',
                                    data_type: 'text', value: 'value3',
                                    desc: '',
                                    is_array: true,
                                    options: [
                                        {
                                            label: 'label1', value: 'value1'
                                        },
                                        {
                                            label: 'label2', value: 'value2'
                                        },
                                        {
                                            label: 'label3', value: 'value3'
                                        },
                                    ]
                                }
                            ]
                        },
                    ]
                }
            ],
        },
        {
            name: 'StudyEvent21',
            desc: '',
            children: [
                {
                    name: 'Form21',
                    desc: '',
                    children: [
                        {
                            name: 'ItemGroup21',
                            desc: '',
                            children: [
                                {
                                    name: 'Item21', value: 'value', desc: '', data_type: 'text', is_array: false
                                },
                                {
                                    name: 'Item22',
                                    data_type: 'text',
                                    desc: '',
                                    is_array: true, value: 'value1',
                                    options: [
                                        {
                                            label: 'label1', value: 'value1'
                                        },
                                        {
                                            label: 'label2', value: 'value2'
                                        },
                                        {
                                            label: 'label3', value: 'value3'
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'ItemGroup22',
                            children: [
                                {
                                    name: 'Item21', value: 'value2', desc: '', data_type: 'text', is_array: false
                                },
                                {
                                    name: 'Item22',
                                    data_type: 'text', value: 'value3',
                                    desc: '',
                                    is_array: true,
                                    options: [
                                        {
                                            label: 'label1', value: 'value1'
                                        },
                                        {
                                            label: 'label2', value: 'value2'
                                        },
                                        {
                                            label: 'label3', value: 'value3'
                                        },
                                    ]
                                }
                            ]
                        },
                    ]
                }
            ],
        },
    ],
}

tpl.children.forEach((SEItem, SEIdx) => {
    let SE = {
        "Description": {
            "TranslatedText": {
                "#text": SEItem.desc,
                "@_xml:lang": "zh_CN"
            }
        },
        "FormRef": [],
        "@_OID": genOID({ type: TYPES.STUDY_EVENT, SEIdx }),
        "@_Name": SEItem.name,
        "@_Repeating": "No",
        "@_Type": "Common",
    }
    //
    let SED = {
        "FormData": [],
        "@_StudyEventOID": SE['@_OID'],
    }
    //
    SEItem.children.forEach((FItem, FIdx) => {
        let F = {
            "Description": {
                "TranslatedText": {
                    "#text": FItem.desc,
                    "@_xml:lang": "zh_CN"
                }
            },
            "ItemGroupRef": [],
            "@_OID": genOID({ type: TYPES.FORM, SEIdx, FIdx }),
            "@_Name": FItem.name,
            "@_Repeating": "No"
        }
        //
        let FD = {
            "ItemGroupData": [],
            "@_FormOID": F['@_OID'],
        }
        SED.FormData.push(FD)
        //
        FItem.children.forEach((IGItem, IGIdx) => {
            let IG = {
                "Description": {
                    "TranslatedText": {
                        "#text": IGItem.desc,
                        "@_xml:lang": "zh_CN"
                    }
                },
                "ItemRef": [
                ],
                "@_OID": genOID({ type: TYPES.ITEM_GROUP, SEIdx, FIdx, IGIdx }),
                "@_Name": IGItem.name,
                "@_Repeating": "No"
            }
            //
            let IGD = {
                "ItemData": [],
                "ItemDataDate": [],
                "ItemDataInteger": [],
                "ItemDataText": [],
                "ItemDataFloat": [],
                "@_ItemGroupOID": IG['@_OID'],
            }
            FD.ItemGroupData.push(IGD)
            //
            IGItem.children.forEach((IItem, IIdx) => {
                let _OID = genOID({ type: TYPES.ITEM, SEIdx, FIdx, IGIdx, IIdx })
                let ID = {
                    "@_ItemOID": _OID,
                    "#text": undefined,
                }
                if (IItem.data_type == DATA_TYPES.TEXT) {
                    ID['#text'] = IItem.value
                    IGD.ItemDataText.push(ID)
                }
                if (IItem.data_type == DATA_TYPES.DATE) {
                    ID['#text'] = IItem.value
                    IGD.ItemDataDate.push(ID)
                }
                if (IItem.data_type == DATA_TYPES.INTEGER) {
                    ID['#text'] = IItem.value
                    IGD.ItemDataInteger.push(ID)
                }
                if (IItem.data_type == DATA_TYPES.FLOAT) {
                    ID['#text'] = IItem.value
                    IGD.ItemDataFloat.push(ID)
                }
                if (IItem.data_type == DATA_TYPES.BOOLEAN) {
                    ID['#text'] = IItem.value
                    IGD.ItemData.push(ID)
                }
                let I = {
                    "Question": {
                        "TranslatedText": {
                            "#text": IItem.desc,
                            "@_xml:lang": "zh_CN"
                        }
                    },
                    "@_SignificantDigits": "0", // ?
                    "@_SASFieldName": _OID,
                    "@_OID": _OID,
                    "@_Name": IItem.name,
                    "@_DataType": IItem.data_type,
                }
                if (!isEmpty(IItem.options)) {
                    let OID = genOID({ type: TYPES.CODE_LIST, SEIdx, FIdx, IGIdx, IIdx, /* CODE_LIST */ })
                    let CL = {
                        "CodeListItem": IItem.options.map((option) => {
                            return {
                                "Decode": {
                                    "TranslatedText": {
                                        "#text": option.label,
                                        "@_xml:lang": "zh_CN"
                                    }
                                },
                                "@_CodedValue": option.value,
                            }
                        }),
                        "@_OID": OID,
                        "@_Name": OID, // ?
                        "@_DataType": IItem.data_type
                    }
                    CodeList.push(CL)
                    I["CodeListRef"] = {
                        "@_CodeListOID": CL['@_OID'],
                    }
                }
                ItemDef.push(I)
                IG.ItemRef.push({
                    "@_ItemOID": I['@_OID'],
                    "@_OrderNumber": `${IIdx}`,
                    "@_Mandatory": "No"
                })
            })
            ItemGroupDef.push(IG)
            F.ItemGroupRef.push({
                "@_ItemGroupOID": IG['@_OID'],
                "@_OrderNumber": `${IGIdx}`,
                "@_Mandatory": "No"
            })
        })
        FormDef.push(F)
        SE.FormRef.push({
            "@_FormOID": F['@_OID'],
            "@_OrderNumber": `${FIdx}`,
            "@_Mandatory": "No"
        })
    })
    //
    StudyEventData.push(SED)
    //
    StudyEventDef.push(SE)
    Protocol.StudyEventRef.push({
        "@_StudyEventOID": SE['@_OID'],
        "@_OrderNumber": `${SEIdx}`,
        "@_Mandatory": "No",
    })
})

let targetXml = `<?xml version="1.0" encoding="UTF-8"?>\n${builder.build(TARGET)}`

console.log(targetXml)
require('fs').writeFileSync('output.xml', targetXml)
