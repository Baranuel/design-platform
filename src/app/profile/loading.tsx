import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";


export default function Loading () {
    return    <section className=" z-40 px-72 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4  flex items-center justify-center">
        <Spin className="mt-6 p-4 bg-white rounded-md shadow-sm" indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </section>
}