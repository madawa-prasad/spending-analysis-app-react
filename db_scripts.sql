--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2022-07-26 20:30:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 16555)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    cat_id integer NOT NULL,
    cat_is_income boolean,
    cat_title character varying(100)
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16554)
-- Name: categories_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_cat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_cat_id_seq OWNER TO postgres;

--
-- TOC entry 3329 (class 0 OID 0)
-- Dependencies: 211
-- Name: categories_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_cat_id_seq OWNED BY public.categories.cat_id;


--
-- TOC entry 210 (class 1259 OID 16546)
-- Name: estimated_budget; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estimated_budget (
    est_id numeric NOT NULL,
    est_income numeric NOT NULL,
    est_expenditure numeric,
    est_year numeric,
    est_month numeric,
    created_on timestamp without time zone
);


ALTER TABLE public.estimated_budget OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16545)
-- Name: estimated_budget_est_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estimated_budget_est_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.estimated_budget_est_id_seq OWNER TO postgres;

--
-- TOC entry 3330 (class 0 OID 0)
-- Dependencies: 209
-- Name: estimated_budget_est_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estimated_budget_est_id_seq OWNED BY public.estimated_budget.est_id;


--
-- TOC entry 214 (class 1259 OID 16590)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    tr_id integer NOT NULL,
    est_id integer NOT NULL,
    tr_is_income boolean NOT NULL,
    tr_description character varying(255) NOT NULL,
    tr_category integer NOT NULL,
    tr_amount numeric NOT NULL,
    tr_date timestamp without time zone NOT NULL
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16589)
-- Name: transactions_tr_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_tr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_tr_id_seq OWNER TO postgres;

--
-- TOC entry 3331 (class 0 OID 0)
-- Dependencies: 213
-- Name: transactions_tr_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_tr_id_seq OWNED BY public.transactions.tr_id;


--
-- TOC entry 3175 (class 2604 OID 16558)
-- Name: categories cat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN cat_id SET DEFAULT nextval('public.categories_cat_id_seq'::regclass);


--
-- TOC entry 3174 (class 2604 OID 16608)
-- Name: estimated_budget est_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estimated_budget ALTER COLUMN est_id SET DEFAULT nextval('public.estimated_budget_est_id_seq'::regclass);


--
-- TOC entry 3176 (class 2604 OID 16593)
-- Name: transactions tr_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN tr_id SET DEFAULT nextval('public.transactions_tr_id_seq'::regclass);


--
-- TOC entry 3180 (class 2606 OID 16560)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (cat_id);


--
-- TOC entry 3178 (class 2606 OID 16610)
-- Name: estimated_budget estimated_budget_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estimated_budget
    ADD CONSTRAINT estimated_budget_pkey PRIMARY KEY (est_id);


--
-- TOC entry 3182 (class 2606 OID 16595)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (tr_id);


--
-- TOC entry 3184 (class 2606 OID 16611)
-- Name: transactions transactions_est_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_est_id_fkey FOREIGN KEY (est_id) REFERENCES public.estimated_budget(est_id);


--
-- TOC entry 3183 (class 2606 OID 16601)
-- Name: transactions transactions_tr_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_tr_category_fkey FOREIGN KEY (tr_category) REFERENCES public.categories(cat_id);


-- Completed on 2022-07-26 20:30:09

--
-- PostgreSQL database dump complete
--

