import config from '../../../config/index.js'

/**
 * 放案 本地数据
 */

// 图片目录
const IMG_CDN = config.cdnDomain + '/web/common/static/scheme/'

/**
 * 方案列表
 {
    id: '',
    type: '',
    title: '',
    intro: '',
    images: [],
    createTime: ''
 }
 */
let list = []

/**
 * 方案详情
 {
    id: '',
    type: '',
    title: '',
    section: [
        {
            subtitle: '',
            content: []
        }
    ],
    createTime: ''
 }
 type: 分类 - id范围
 type: 0变电 - [0, 50)
 type: 1输电 - [50, 100)
 type: 2配电 - [100, 150)
 type: 3视觉显示 - [150, 200)

 */
const detail = [
    {
        id: 0,
        type: 0,
        title: '变电站辅助设备全面监控系统解决方案',
        section: [
            {
                subtitle: '方案简介',
                content: [
                    '方案依据国家电网《变电运维班辅助设备全面监控系统建设技术规范（试行）》，建立统一物联模型，融合分析站内辅助设备信息，实现站内运行环境的深度感知、风险预警、远程监控及智能联动，提升变电站状态感知的及时性、主动性和准确性。',
                    '方案包括辅助设备站端监控系统及辅助设备集中监控系统，站端辅助设备监控主机接入在线监测、消防、SF6监测、照明控制等子系统；在地市公司/省检修公司，辅助设备集中监控系统主站汇集融合站端数据，通过客户端对变电站辅助设备进行远程集中监控。',
                    [`${IMG_CDN}0-1.png`]
                ]
            },
            {
                subtitle: '方案特色',
                content: [
                    '物联代理，统一接入：通过物联协议适配模块，标准化统一接入感知终端，实现站端辅助设备数据全面感知和汇集融合。进而实现多个独立系统的监视替代，为实现站端的边缘代理和边缘计算提供可能',
                    '边缘计算，区域自治：数据就地分析，提高计算时效性，主动上送预警关键信息，降低网络传输带宽需求，减轻主站计算压力。',
                    '智能诊断，辅助决策：通过边缘物联代理一体化平台的边缘业务应用，开展站内多源数据融合分析，实现设备异常智能诊断、风险主动预警和故障自动研判，辅助运检人员管理决策，提高工作质效。'
                ]
            },
            {
                subtitle: '应用情况',
                content: [
                    '方案多次中标国网变电站辅助设备全面监控系统项目，现已在重庆、四川、内蒙、安徽、辽宁、北京、黑龙江、陕西、甘肃等十余个网省公司实施应用。根据国网设备部对于变电运维班辅助设备全面监控系统建设的要求，方案将在各省市公司推广应用，助力基层减负增效。',
                    [`${IMG_CDN}0-2.png`, `${IMG_CDN}0-3.png`]
                ]
            }
        ],
        createTime: '2021-05-22 14:15'
    },
    {
        id: 1,
        type: 0,
        title: '变电站远程智能巡检解决方案',
        section: [
            {
                subtitle: '方案简介',
                content: [
                    '方案依据国家电网《变电站智能机器人与高清视频联合巡检系统技术规范(试行）》、《特高压换流站远程智能巡检系统建设技术方案（设备直流〔2019〕103号）》等，结合视频图像人工智能分析技术，对巡视中记录的红外图谱、可见光照片、音频文件等数据进行智能分析与自动判断，自动生成巡检报告，具备远程自动巡视、自动识别、智能预警和智能决策等功能，结合智能巡检策略，实现机器代人，有效降低运维人员劳动强度和作业风险。',
                    [`${IMG_CDN}1-1.png`]
                ]
            },
            {
                subtitle: '方案特色',
                content: [
                    '机器代人，提质增效：结合变电运维人员日常巡视、带电检测、表计抄录等大量重复性工作，系统梳理巡检点位，转变传统设备巡检模式，最终实现人工巡视替代，提质增效。',
                    '类脑智能，全面巡视：自主研发的类脑算法建立目标检测、目标识别、场景分割模型，实现20多类缺陷和场景的智能分析，有效降低运检中出现的漏检、错检机率。',
                    '云边协同，快速部署：基于NARI-AI融合平台智能缺陷诊断与联合协同巡检技术以及自主可控的华为昇腾平台，通过云边协同，云端统一管理，模型远程下发与快速部署，实现变电站视频图像类业务数据全息感知和多维度立体智能化巡检。'
                ]
            },
            {
                subtitle: '应用情况',
                content: [
                    '方案已在江苏、安徽、陕西、广州等多个电力公司应用。',
                    '在特高压±1100kV古泉站、特高压1000kV淮南变、500kV长临河变、220kV无为变、110kV尖峰变等多座变电站（换流站）应用，有效降低安全生产风险，助力基层减负增效。方案基于现有建设经验，仍在不断完善提升，并在全国变电站（换流站）继续推广使用。',
                    [`${IMG_CDN}1-2.png`, `${IMG_CDN}1-3.png`]
                ]
            }
        ],
        createTime: '2021-05-21 21:15'
    },
    {
        id: 2,
        type: 0,
        title: '变电站主设备在线监测解决方案',
        section: [
            {
                subtitle: '方案简介',
                content: [
                    '方案遵循国家电网《变电设备在线监测系统技术导则》，拓展主设备状态信息监测维度，整合各类监测装置数据进行统一管理展示，实时推送故障告警信息，实现主设备状态的多维度立体感知，解决传统监测方式就地显示巡视任务重、数据采集维度欠缺以及各监测系统间相互独立不利于管理的问题。'
                ]
            },
            {
                subtitle: '方案特色',
                content: [
                    '高效监测主动：对主设备状态进行实时监测，起到故障及时告警与分析诊断功能，具备将采集数据上送至省市级主站平台的能力，实现设备监控从被动监控向主动监控模式转变，提高维护效率，减轻巡视负担。',
                    '内外网安全隔离：通过状态接入控制器对各类监测装置进行统一管理并与内网隔离，切实保障内网信息安全。',
                    '扩展接入能力强：具备私有协议定制扩展功能以满足新型在线监测装置的接入需求，减少独立监测系统在站内的部署。'
                ]
            },
            {
                subtitle: '应用情况',
                content: [
                    '变电站主设备在线监测系统已在安徽地区大规模应用，陕西、湖南、江苏、四川等数十座变电站已相继开展试点应用，应用项目电压等级涵盖110kV变电站至±1100kV换流站，推进变电站主设备感知层建设进程，未来在变电、发电、轨道交通、工厂企业等领域有着广阔的应用空间。',
                    [`${IMG_CDN}2-1.png`, `${IMG_CDN}2-2.png`, `${IMG_CDN}2-3.png`]
                ]
            }
        ],
        createTime: '2021-05-21 20:05'
    },

    {
        id: 50,
        type: 1,
        title: '输电全景智慧管控平台解决方案',
        section: [
            {
                subtitle: '方案简介',
                content: [
                    '落实公司“具有中国特色国际领先的能源互联网企业”战略部署，遵从国网设备部输电线路顶层设计方案，遵循“全景全息、透明电网、一眼看穿”理念，采用微服务架构，将人工智能、大数据、数字孪生等技术与输电业务深度融合，打造状态感知、全景监控的输电全景智慧管控平台，助力输电业务管理实现“电网一张图、数据一个源、业务一条线”。'
                ]
            },
            {
                subtitle: '方案特色',
                content: [
                    '全息感知：接入视频、图像、覆冰、防山火、舞动、杆塔倾斜等传感器监测数据，实现本体状态、环境的实时全息感知',
                    '多维融合：汇集融合多专业系统，打通系统数据壁垒，实现多维数据统一展示和分析',
                    '自主预警：大数据分析、数字孪生和人工智能技术与输电管理业务深度融合，实现火灾、覆冰、舞动、风灾、雷灾、地灾、外破、缺陷、施工等的自主预警',
                    '协同巡检：一张图上融合巡视人员、无人机位置、巡视记录、缺陷隐患等信息，实现巡视记录“透明化”、护线人员“透视化”、机巡作业“全画像”',
                    [`${IMG_CDN}50-1.png`]
                ]
            },
            {
                subtitle: '应用案例',
                content: [
                    [`${IMG_CDN}50-2.png`, `${IMG_CDN}50-3.png`],
                    '项目简介：输电全景智慧管控示范应用为国网试点建设项目，安徽公司是首批试点单位之一。南瑞继远电网公司作为该项目的主要承建单位，充分借鉴吸取已有各系统平台的建设经验和成果，率先完成安徽公司输电全景智慧管控平台应用建设。平台解决了系统烟囱林立、数据离散管理、业务线下管控等问题，实现了“电网一张图、数据一个源、业务一条线”，充分满足省-市-班组不同层级专业管理需求。'
                ]
            },
            {
                subtitle: '核心产品',
                content: [
                    [`${IMG_CDN}50-4.png`]
                ]
            }
        ],
        createTime: '2021-05-23 09:08'
    },
    {
        id: 51,
        type: 1,
        title: '智慧线路在线监测解决方案',
        section: [
            {
                subtitle: '方案简介',
                content: [
                    '方案遵循国家电网《设备侧物联网输电专业顶层设计》演进路线要求，通过汇聚图像、视频、覆冰、防山火、导线电流、导线温度、故障定位等各类感知终端数据，采用前端边缘计算和就地分析模式，利用大数据、人工智能技术，建立线路、杆塔、灾害、感知终端等一张图知识图谱，通过数据融合贯通、资源开放共享，实现输电线路本体和通道环境的智能感知、智能预警和精准运维。'
                ]
            },
            {
                subtitle: '方案特色',
                content: [
                    '接口兼容 多元通讯：边缘汇聚终端具备多个可扩展接口，满足线路本体巡视全面性、多样性、综合性的要求。同时，满足短距离无线传输方式及有线通讯方式，支持4G/5G/微波多元传输。',
                    '边缘计算 前端联动：前端搭载华为Atlas200加速模块，边缘计算、就地分析、降低流量，后端采用GPU超算平台，图片批量监测、缺陷高效识别，前端边缘计算+后台智能分析，提升隐患缺陷识别率和精准度。',
                    '协议多样，扩展性强：汇聚终端RJ45接口、RS-485接口、2.4GHz数字RF收发器，支持国网I1协议、南网协议、国网B接口协议，支持SM1/SM7/SM2加密。',
                    [`${IMG_CDN}51-1.png`]
                ]
            },
            {
                subtitle: '应用案例',
                content: [
                    [`${IMG_CDN}51-2.png`, `${IMG_CDN}51-3.png`],
                    '项目简介：南京江北新区220kV城旺2M09线等多条线路输电线路导线温度、微气象、激光防外破、导线弧垂、绝缘子污秽度、杆塔倾斜在线监测装置建设，实时数据通过I1协议传输到输变电设备状态监测系统中和同时根据业主要求将微气象和导线温度数据接入到工区部署的智慧线路系统之中。解决了江北多条老旧线路运行过程中防外破、导线电流、导线温度等数据的实时监测，并将数据共享给调度部门为线路负荷的调度提供的数据依据。'
                ]
            },
            {
                subtitle: '核心产品',
                content: [
                    [`${IMG_CDN}51-4.png`]
                ]
            }
        ],
        createTime: '2021-05-23 09:21'
    },

    {
        id: 100,
        type: 2,
        title: '面向智慧园区（楼宇）的直流配电解决方案',
        section: [
            {
                subtitle: '方案简介',
                content: [
                    '方案包含上级交流配电网、直流配电系统、分布式电源及储能装置、交直流负荷，通过光伏和储能的合理化布置以及用电负荷的直流化改造，并配合合理的控制策略及完善的直流保护系统，提升分布式能源的消纳能力，实现安全、高效、高可靠、节能环保的供电模式。'
                ]
            },
            {
                subtitle: '方案特色',
                content: [
                    '便于分布式电源接入：不涉及相位、频率控制，便于分布式电源接入，且直流供电系统网损小，供电可靠性高，供电容量/半径高。',
                    '模块标准化设计：能量路由器、储能双向换流器、光伏换流器关键设备采用模块化设计，可并机使用，且单台故障不影响其他模块运行，方便系统维护及后期容量扩展。',
                    '能量流与信息流融合：通过采集用户负荷、发电设备、储能设备信息并上传至能量管理系统，对发电设备、储能设备及用户负荷相互之间的能量流进行控制。',
                    [`${IMG_CDN}100-1.png`]
                ]
            },
            {
                subtitle: '应用情况',
                content: [
                    '安徽高新区某园区直流示范工程',
                    [`${IMG_CDN}100-2.png`, `${IMG_CDN}100-3.png`],
                    '直流配电系统广泛应用于机房与数据中心、智慧照明、直流楼宇、直流微网等场景，在安徽高新区某园区建立直流示范工程，给园区单栋三层小楼及室外照明、充电桩供电。'
                ]
            },
            {
                subtitle: '核心产品',
                content: [
                    [`${IMG_CDN}100-4.png`],
                    '具备交流、光伏、储能输入接口；DC375V、DC750V输出接口；选配AC220V、DC220V输出接口；效率：≥95%；额定容量：200kW；单模块容量：25kW；模块化设计，方便系统维护及后期容量扩展。',
                    [`${IMG_CDN}100-5.png`],
                    '满足DC/DC变换，具备直流换流到直流母线；具有MPPT功能；单模块容量20kW；模块化设计，方便系统维护及后期容量扩展。',
                    [`${IMG_CDN}100-6.png`],
                    '实现能量的双向流动，可独立/并网双模式运行；支持多种通信接口，适应于多种储能电池的充放电控制；单模块容量20kW；模块化设计，方便系统维护及后期容量扩展。'
                ]
            }
        ],
        createTime: '2021-05-23 09:29'
    },

    {
        id: 150,
        type: 3,
        title: '瑞彩视觉显控系统解决方案',
        section: [
            {
                subtitle: '方案简介',
                content: [
                    '方案依托南瑞继远电网“产品+集成+服务”优势，采用“关键产品自主化，辅助产品集成化”的建设集成模式以及分布式IP网络架构，应用瑞彩系列产品、信息处理平台、可视化展示平台，为用户提供从系统建设到运维管理一站式服务，可广泛适用于应急指挥中心、调度指挥中心、公安指挥中心、气象服务中心、城市运营中心等各行业监控中心。'
                ]
            },
            {
                subtitle: '方案特点',
                content: [
                    '稳定可靠：系统采用分布式网络架构，可靠性高，容错能力强，某一节点故障更换节点不影响系统正常运行。',
                    '健康护眼：显示终端通过低蓝光认证，表面防眩光处理，可有效降低光强辐射，长时间观看不伤眼。',
                    '操作便捷：通过触摸屏可直接控制多套大屏幕显示系统，对大屏进行信号开窗、关窗、窗口缩放、预案调用等控制功能。',
                    [`${IMG_CDN}150-1.png`],
                ]
            },
            {
                subtitle: '应用情况',
                content: [
                    '已应用于国网安徽、宁夏、湖南、黑龙江等多个省、市电力公司的室内显示系统，助力各项监控、指挥、调度工作平稳运行',
                    '典型案例一：华东应急指挥系统安徽区域应急指挥中心',
                    [`${IMG_CDN}150-2.png`, `${IMG_CDN}150-3.png`],
                    '典型案例二：国网宁夏电力有限公司调度中心',
                    [`${IMG_CDN}150-4.png`, `${IMG_CDN}150-5.png`]
                ]
            },
            {
                subtitle: '核心产品',
                content: [
                    [`${IMG_CDN}150-6.png`],
                    'COB高清显示大屏：无拼缝、高亮度、高清晰度、高防护性；支持4K及以上分辨率；适用于指挥大厅/控制室/调度室等对显示体验有极致要求的场景。',
                    [`${IMG_CDN}150-7.png`],
                    '瑞彩智慧触控一体机：支持2K/4K分辨率显示；支持触摸控制、精准书写、一键传屏等功能；110寸、138寸、165寸、220寸等更大的尺寸选择，满足不同大小会议室使用需求。',
                    [`${IMG_CDN}150-8.png`],
                    '信息协作处理平台：基于硬件视频处理器、网络数据传输、系统双向控制、人机交互、多点触摸等技术；整合系统的重点音视频信息，精准地在控制中心大屏幕上调用、显示、控制视频信息。'
                ]
            }
        ],
        createTime: '2021-05-23 09:39'
    }
]

// 从详情内容里提取列表数据
function genList(data, limit) {
    const arr = []
    let i = 0
    for (const v of data) {
        let intro = ''
        let images = []
        const max = limit[i] || 1
        for (const s of v.section) {
            for (const c of s.content) {
                if ((c instanceof Array) && c.length) {
                    // 按配置表取列表图片数量 未配置时默认最多取一张图
                    for (const item of c) {
                        if (images.length < max) {
                            images.push(item)
                        }
                    }
                } else {
                    if (!intro) intro = c
                }
            }
        }
        // 列表字段
        arr.push({
            id: v.id,
            type: v.type,
            title: v.title,
            intro,
            images: images,
            createTime: v.createTime
        })
        i++
    }

    return arr
}

// 配置前N个列表里图片数量
const imgLimit = []

list = genList(detail, imgLimit)

export {
    list,
    detail
}
