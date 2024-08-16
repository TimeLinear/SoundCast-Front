import { CSSProperties } from 'react';
import '../index.css'

const MusicReportModal = () => {
    const commonFlexStyle: CSSProperties = {
        display: "flex",
    };

    const commonColumnFlexStyle: CSSProperties = {
        ...commonFlexStyle,
        flexDirection: "column",
    };

    const commonTextStyle: CSSProperties = {
        textAlign: "start",
        font: "bolder 36px Inter",
    };

    const commonRadioInputStyle: CSSProperties = {
        margin: "0 10px",
    };

    const commonLabelStyle: CSSProperties = {
        font: "bold 16px Inter",
    };

    const containerStyle: CSSProperties = {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#1C003B",
        borderRadius: "10px",
        minWidth: "600px",
        alignSelf: "center",
        minHeight: "450px",
        padding: "10px",
        ...commonColumnFlexStyle,
    };

    const headerStyle: CSSProperties = {
        textAlign: "start",
        color: "white",
        font: "bolder 34px Inter",
        paddingLeft: "5px",
    };

    const contentContainerStyle: CSSProperties = {
        flexGrow: "1",
        backgroundColor: "#F0ECFD",
        borderRadius: "10px",
        padding: "15px 20px",
        ...commonColumnFlexStyle,
    };

    const footerStyle: CSSProperties = {
        ...commonFlexStyle,
        justifyContent: "space-between",
        alignItems: "center",
    };

    const sendButtonStyle: CSSProperties = {
        backgroundColor: "#1C003B",
        border: "2px solid #770ABF",
        color: "white",
        font: "18px Inter",
        padding: "5px 24px",
        borderRadius: "10px",
    };

    return (
        <div style={containerStyle}>
            <header style={headerStyle}>신고</header>
            <section style={contentContainerStyle}>
                <div style={commonTextStyle}>신고사유</div>
                <div style={{ ...commonColumnFlexStyle, flexGrow: "1", paddingLeft: "30px", alignItems: "flex-start" }}>
                    <div style={{ marginTop: "20px" }}>
                        <input style={commonRadioInputStyle} type="radio" name="reportReason" id="report_reason1" defaultChecked />
                        <label style={commonLabelStyle} htmlFor="report_reason1">음원이 아닌 파일 업로드</label>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <input style={commonRadioInputStyle} type="radio" name="reportReason" id="report_reason2" />
                        <label style={commonLabelStyle} htmlFor="report_reason2">타인의 저작물 도용</label>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <input style={commonRadioInputStyle} type="radio" name="reportReason" id="report_reason3" />
                        <label style={commonLabelStyle} htmlFor="report_reason3">폭력적 혹은 혐오스러운 컨텐츠</label>
                    </div>
                    <div style={{ marginTop: "20px", ...commonColumnFlexStyle, width: "100%", flexGrow: "1", paddingBottom: "5px" }}>
                        <div style={commonFlexStyle}>
                            <input style={commonRadioInputStyle} type="radio" name="reportReason" id="report_reason4" />
                            <label style={commonLabelStyle} htmlFor="report_reason4">기타</label>
                        </div>
                        <div style={{ paddingLeft: "30px", flexGrow: "1", ...commonColumnFlexStyle }}>
                            <textarea name="etcReason" style={{
                                boxSizing: "border-box",
                                width: "100%",
                                resize: "none",
                                flexGrow: "1",
                                outline: "none"
                            }}></textarea>
                        </div>
                    </div>
                </div>
                <div style={footerStyle}>
                    <span style={{ font: "12px Inter", color: "gray" }}>※ 반복된 허위 신고 시 제제를 받을 수 있습니다</span>
                    <button style={sendButtonStyle}>보내기</button>
                </div>
            </section>
        </div>

    );
}

export default MusicReportModal;