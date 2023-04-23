import Counter from "../models/Counter.js";
import moment from "moment";

export const getCounter = async (req, res) => {
    let getCount;
    const counters = await Counter.findAll();

    if (counters.length === 0) {
        try {
            const counter = await Counter.create({
                value: 1
            });

            getCount = counter.value;
        } catch (error) {
            console.log(error);
        }
    } else {
        const counter = await Counter.findOne({
            where: {
                id: counters[0].id
            }
        })

        const month = moment(counter.updatedAt).format("M");
        const now = new Date();
        const monthNow = moment(now).format("M");

        try {
            if (month === monthNow) {
                await Counter.update({
                    value: counter.value + 1
                }, {
                    where: {
                        id: counter.id
                    }
                });
            } else {
                await Counter.update({
                    value: 1
                }, {
                    where: {
                        id: counter.id
                    }
                });
            }

            const count = await Counter.findOne({
                where: {
                    id: counter.id
                }
            })

            getCount = count.value;
        } catch (error) {
            console.log(error)
        }
    }

    res.json(getCount);
}