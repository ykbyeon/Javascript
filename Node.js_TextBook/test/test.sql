select
    tr.ng_lot_cnt / tr.total_lot_cnt_1st_INSP * 100 asvalue,
    cr.test_result_id,
    cr.test_result_no,
    cr.id as lot_id,
    cr.lot_no,
    cr.curr_site as site_div_seq
from
    (
        select
            dl.test_result_no,
            dl.test_result_id,
            dl.lot_no,
            dl.id,
            dl.curr_site,
            sh.instp_seq,
            sh.pass_yn,
            count(
                case
                    when sh.pass_yn = 'n' then sh.lot_id
                end
            ) over (
                partition by
                    dl.test_result_no,
                    sh.insp_seq
            ) as ng_lot_cnt,
            count(
                case
                    when sh.insp_seq = 1 then sh.pass_yn
                end
            ) over (
                partition by
                    dl.test_result_no
            ) as tatal_lot_cnt_1st_insp
        from
            tr_no_list nl,
            st_ds_lot dl,
            if_insp_shipment_halt_new sh
        where
            1 = 1
            and nl.test_result_no = dl.test_result_no
            and dl.lot_no = sh.lot_id
            and dl.curr_site = sh.site_div_seq
            and sh.insp_seq in (1, 2, 3)
    ) cr
where
    1 = 1
    and cr.insp_seq = 1
    and cr.total_lot_cnt_1st_INSP != 0;